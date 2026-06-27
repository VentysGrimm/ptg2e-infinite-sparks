import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const failures = [];
const warnings = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function readJson(relativePath) {
  const absolutePath = join(root, relativePath);
  try {
    return JSON.parse(readFileSync(absolutePath, "utf8"));
  } catch (error) {
    failures.push(`Unable to parse ${relativePath}: ${error.message}`);
    return {};
  }
}

function assertPackagePath(relativePath, label) {
  const normalized = String(relativePath).replaceAll("\\", "/");
  assert(!normalized.startsWith("source-material/"), `${label} must not reference source-material/: ${relativePath}`);
  assert(existsSync(join(root, relativePath)), `${label} does not exist: ${relativePath}`);
}

const manifest = readJson("module.json");

assert(manifest.id === "ptg2e-infinite-sparks", "module.json id should be ptg2e-infinite-sparks");
assert(Boolean(manifest.title), "module.json title is required");
assert(Boolean(manifest.description), "module.json description is required");
assert(Boolean(manifest.version), "module.json version is required");
assert(Array.isArray(manifest.authors) && manifest.authors.length > 0, "module.json authors must contain at least one author");
assert(Boolean(manifest.compatibility?.minimum), "module.json compatibility.minimum is required");
assert(Boolean(manifest.compatibility?.verified), "module.json compatibility.verified is required");

const relatedSystems = manifest.relationships?.systems ?? [];
assert(
  relatedSystems.some((system) => system.id === "part-time-gods"),
  "module.json should declare compatibility with the part-time-gods system"
);

for (const path of manifest.esmodules ?? []) {
  assertPackagePath(path, "esmodule path");
}

for (const path of manifest.styles ?? []) {
  assertPackagePath(path, "style path");
}

for (const language of manifest.languages ?? []) {
  assertPackagePath(language.path, `language path for ${language.lang ?? "unknown"}`);
  readJson(language.path);
}

const packNames = new Set();
for (const pack of manifest.packs ?? []) {
  assert(Boolean(pack.name), "Each pack must have a name");
  assert(Boolean(pack.label), `Pack ${pack.name ?? "(unknown)"} must have a label`);
  assert(Boolean(pack.path), `Pack ${pack.name ?? "(unknown)"} must have a path`);
  assert(Boolean(pack.type), `Pack ${pack.name ?? "(unknown)"} must have a type`);
  assert(!packNames.has(pack.name), `Duplicate pack name: ${pack.name}`);
  packNames.add(pack.name);

  assertPackagePath(pack.path, `pack path for ${pack.name}`);

  const packPath = join(root, pack.path);
  if (existsSync(packPath) && statSync(packPath).isDirectory()) {
    const entries = readdirSync(packPath).filter((entry) => entry !== ".gitkeep");
    if (entries.length === 0) {
      warn(`Pack ${pack.name} is still a placeholder and has no Foundry-generated data yet.`);
    }
  }
}

if (!existsSync(join(root, "source-material"))) {
  warn("source-material/ does not exist locally yet. Create it when you are ready to add the PDF.");
}

try {
  const trackedSourceFiles = execFileSync("git", ["ls-files", "source-material"], {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"]
  }).trim();

  assert(!trackedSourceFiles, `source-material/ has tracked files:\n${trackedSourceFiles}`);
} catch {
  warn("Could not run git ls-files to verify source-material/ tracking.");
}

if (warnings.length > 0) {
  console.warn("Warnings:");
  for (const message of warnings) console.warn(`- ${message}`);
}

if (failures.length > 0) {
  console.error("Validation failed:");
  for (const message of failures) console.error(`- ${message}`);
  process.exitCode = 1;
} else {
  console.log("Foundry module scaffold validation passed.");
}
