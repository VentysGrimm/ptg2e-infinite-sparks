import { deflateRawSync } from "node:zlib";
import { copyFile, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { basename, dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const manifestPath = join(root, "module.json");
const manifestOutPath = join(dist, "module.json");
const zipPath = join(dist, "module.zip");
const moduleId = "ptg2e-infinite-sparks";
const repoUrl = "https://github.com/VentysGrimm/ptg2e-infinite-sparks";

const excludedTopLevel = new Set([
  ".agents",
  ".codex",
  ".foundry",
  ".git",
  "dist",
  "node_modules",
  "source-material",
  "tmp"
]);
const excludedFileNames = new Set([".env"]);

const crcTable = new Uint32Array(256);
for (let i = 0; i < crcTable.length; i += 1) {
  let value = i;
  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }
  crcTable[i] = value >>> 0;
}

function crc32(buffer) {
  let value = 0xffffffff;
  for (const byte of buffer) {
    value = crcTable[(value ^ byte) & 0xff] ^ (value >>> 8);
  }
  return (value ^ 0xffffffff) >>> 0;
}

function toZipPath(absolutePath) {
  return relative(root, absolutePath).split(sep).join("/");
}

function shouldInclude(absolutePath) {
  const relativePath = toZipPath(absolutePath);
  const [topLevel] = relativePath.split("/");
  const fileName = basename(relativePath);

  if (!relativePath || excludedTopLevel.has(topLevel)) return false;
  if (excludedFileNames.has(fileName)) return false;
  if (fileName.toLowerCase().endsWith(".zip")) return false;

  return true;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertManifest(manifest) {
  assert(manifest.id === moduleId, `module.json id must be ${moduleId}`);
  assert(manifest.url === repoUrl, "module.json url does not match the GitHub repository");
  assert(
    manifest.manifest === "https://raw.githubusercontent.com/VentysGrimm/ptg2e-infinite-sparks/main/module.json",
    "module.json manifest URL does not match the public main-branch manifest"
  );
  assert(
    manifest.download === `${repoUrl}/archive/refs/heads/main.zip`,
    "module.json download URL does not match the public main-branch GitHub archive"
  );
}

function dosTimestamp(date) {
  const year = Math.min(Math.max(date.getFullYear(), 1980), 2107);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = Math.floor(date.getSeconds() / 2);

  return {
    date: ((year - 1980) << 9) | (month << 5) | day,
    time: (hours << 11) | (minutes << 5) | seconds
  };
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  entries.sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    const absolutePath = join(directory, entry.name);
    if (!shouldInclude(absolutePath)) continue;

    if (entry.isDirectory()) {
      files.push(...await collectFiles(absolutePath));
    } else if (entry.isFile()) {
      files.push(absolutePath);
    }
  }

  return files;
}

function writeLocalFileHeader({ crc, compressedSize, uncompressedSize, name, timestamp }) {
  const header = Buffer.alloc(30);

  header.writeUInt32LE(0x04034b50, 0);
  header.writeUInt16LE(20, 4);
  header.writeUInt16LE(0x0800, 6);
  header.writeUInt16LE(8, 8);
  header.writeUInt16LE(timestamp.time, 10);
  header.writeUInt16LE(timestamp.date, 12);
  header.writeUInt32LE(crc, 14);
  header.writeUInt32LE(compressedSize, 18);
  header.writeUInt32LE(uncompressedSize, 22);
  header.writeUInt16LE(name.length, 26);
  header.writeUInt16LE(0, 28);

  return header;
}

function writeCentralDirectoryHeader({ crc, compressedSize, uncompressedSize, name, timestamp, offset }) {
  const header = Buffer.alloc(46);

  header.writeUInt32LE(0x02014b50, 0);
  header.writeUInt16LE(20, 4);
  header.writeUInt16LE(20, 6);
  header.writeUInt16LE(0x0800, 8);
  header.writeUInt16LE(8, 10);
  header.writeUInt16LE(timestamp.time, 12);
  header.writeUInt16LE(timestamp.date, 14);
  header.writeUInt32LE(crc, 16);
  header.writeUInt32LE(compressedSize, 20);
  header.writeUInt32LE(uncompressedSize, 24);
  header.writeUInt16LE(name.length, 28);
  header.writeUInt16LE(0, 30);
  header.writeUInt16LE(0, 32);
  header.writeUInt16LE(0, 34);
  header.writeUInt16LE(0, 36);
  header.writeUInt32LE(0, 38);
  header.writeUInt32LE(offset, 42);

  return header;
}

function writeEndOfCentralDirectory({ fileCount, centralDirectorySize, centralDirectoryOffset }) {
  const record = Buffer.alloc(22);

  record.writeUInt32LE(0x06054b50, 0);
  record.writeUInt16LE(0, 4);
  record.writeUInt16LE(0, 6);
  record.writeUInt16LE(fileCount, 8);
  record.writeUInt16LE(fileCount, 10);
  record.writeUInt32LE(centralDirectorySize, 12);
  record.writeUInt32LE(centralDirectoryOffset, 16);
  record.writeUInt16LE(0, 20);

  return record;
}

async function createZip(files) {
  const localRecords = [];
  const centralDirectoryRecords = [];
  let offset = 0;

  for (const file of files) {
    const relativePath = toZipPath(file);
    const name = Buffer.from(relativePath, "utf8");
    const contents = await readFile(file);
    const compressed = deflateRawSync(contents, { level: 9 });
    const fileStat = await stat(file);
    const timestamp = dosTimestamp(fileStat.mtime);
    const crc = crc32(contents);
    const localHeader = writeLocalFileHeader({
      crc,
      compressedSize: compressed.length,
      uncompressedSize: contents.length,
      name,
      timestamp
    });
    const centralDirectoryHeader = writeCentralDirectoryHeader({
      crc,
      compressedSize: compressed.length,
      uncompressedSize: contents.length,
      name,
      timestamp,
      offset
    });

    localRecords.push(localHeader, name, compressed);
    centralDirectoryRecords.push(centralDirectoryHeader, name);
    offset += localHeader.length + name.length + compressed.length;
  }

  const centralDirectoryOffset = offset;
  const centralDirectorySize = centralDirectoryRecords.reduce((total, record) => total + record.length, 0);
  const endRecord = writeEndOfCentralDirectory({
    fileCount: files.length,
    centralDirectorySize,
    centralDirectoryOffset
  });

  await writeFile(zipPath, Buffer.concat([...localRecords, ...centralDirectoryRecords, endRecord]));
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
assertManifest(manifest);

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await copyFile(manifestPath, manifestOutPath);

const files = await collectFiles(root);
if (!files.some((file) => toZipPath(file) === "module.json")) {
  throw new Error("Release zip would not include module.json at its root.");
}

await createZip(files);

console.log(`Created ${toZipPath(manifestOutPath)}`);
console.log(`Created ${toZipPath(zipPath)} with ${files.length} files.`);
