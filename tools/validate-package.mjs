import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const moduleId = "ptg2e-infinite-sparks";
const dataBackedPacks = new Set(["rules-reference", "character-options", "premade-actors", "random-tables"]);
const failures = [];
const warnings = [];
const characterSkillKeys = [
  "athletics",
  "crafts",
  "deception",
  "discipline",
  "empathy",
  "fighting",
  "fortitude",
  "influence",
  "intuition",
  "knowledge",
  "marksman",
  "medicine",
  "might",
  "perception",
  "perform",
  "speed",
  "stealth",
  "survival",
  "tech",
  "travel"
];
const characterManifestationKeys = [
  "aegis",
  "beckon",
  "journey",
  "minion",
  "oracle",
  "puppetry",
  "ruin",
  "shaping",
  "soul"
];

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
assert(manifest.url === "https://github.com/VentysGrimm/ptg2e-infinite-sparks", "module.json url should point to the GitHub repository");
assert(
  manifest.manifest === "https://raw.githubusercontent.com/VentysGrimm/ptg2e-infinite-sparks/main/module.json",
  "module.json manifest should point to the public main-branch manifest"
);
assert(
  manifest.download === "https://github.com/VentysGrimm/ptg2e-infinite-sparks/archive/refs/heads/main.zip",
  "module.json download should point to the public main-branch GitHub archive"
);
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
    if (entries.length === 0 && !dataBackedPacks.has(pack.name)) {
      warn(`Pack ${pack.name} is still a placeholder and has no Foundry-generated data yet.`);
    }
  }
}

const modulePackFolder = (manifest.packFolders ?? []).find((folder) => folder.name === "PTG2e Infinite Sparks");
const folderPackNames = new Set(modulePackFolder?.packs ?? []);

assert(Boolean(modulePackFolder), "module.json must group compendiums in a PTG2e Infinite Sparks pack folder");
assert(modulePackFolder?.sorting === "m", "PTG2e Infinite Sparks pack folder should use manual sorting");
assert(folderPackNames.size === packNames.size, "PTG2e Infinite Sparks pack folder must include every module pack");

for (const packName of folderPackNames) {
  assert(packNames.has(packName), `PTG2e Infinite Sparks pack folder references unknown pack: ${packName}`);
}

for (const packName of packNames) {
  assert(folderPackNames.has(packName), `Pack ${packName} must be in the PTG2e Infinite Sparks pack folder`);
}

function assertFoundryId(id, label) {
  assert(/^[A-Za-z0-9]{16}$/.test(String(id)), `${label} must be a 16-character Foundry id`);
}

function assertSourcePages(pages, label) {
  assert(Array.isArray(pages) && pages.length > 0, `${label} must include at least one source PDF page`);

  for (const page of pages ?? []) {
    assert(Number.isInteger(page), `${label} source page must be an integer: ${page}`);
    assert(page >= 1 && page <= 121, `${label} source page is outside the Infinite Sparks PDF range: ${page}`);
  }
}

function assertNoSourceMaterialReference(value, label) {
  const serialized = JSON.stringify(value);
  assert(!serialized.includes("source-material/"), `${label} must not reference source-material/`);
}

function stripHtml(value) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function assertReadableTextIncludes(haystack, needle, label) {
  const compactHaystack = stripHtml(haystack).toLowerCase();
  const compactNeedle = stripHtml(needle).toLowerCase();
  const excerpt = compactNeedle.slice(0, 48);

  assert(compactHaystack.includes(excerpt), `${label} must include readable rules text for: ${excerpt}`);
}

function assertPositiveRatings(ratings, allowedKeys, expectedCount, label) {
  const entries = Object.entries(ratings ?? {}).filter(([, value]) => Number(value) > 0);

  assert(entries.length === expectedCount, `${label} must include ${expectedCount} positive ratings`);

  for (const [key, value] of entries) {
    assert(allowedKeys.includes(key), `${label} includes unknown rating key: ${key}`);
    assert(Number.isInteger(value), `${label} rating for ${key} must be an integer`);
    assert(value > 0, `${label} rating for ${key} must be positive`);
  }
}

function assertItemSystem(document, label) {
  assert(Boolean(document.type), `${label} must include an Item subtype`);
  assert(Boolean(document.system?.rules?.summary), `${label} must include system.rules.summary`);
  assert(Boolean(document.system?.rules?.fullText), `${label} must include system.rules.fullText`);
  assert(document.system?.rules?.source?.book === "Infinite Sparks, A Part-Time Gods Second Edition Companion", `${label} must include Infinite Sparks rules source metadata`);
  assert(Boolean(document.system?.description), `${label} must include system.description`);

  if (["occupation", "archetype", "theology"].includes(document.type)) {
    assert(Boolean(document.system?.grants), `${label} must include system.grants`);
  }

  if (document.type === "occupation") {
    assertReadableTextIncludes(document.system.rules.fullText, `Free Time ${document.system?.grants?.resources?.freeTime}`, `${label} occupation explanation`);
    assertReadableTextIncludes(document.system.rules.fullText, `Wealth ${document.system?.grants?.resources?.wealth}`, `${label} occupation explanation`);
    assertReadableTextIncludes(document.system.rules.fullText, document.system?.grants?.blessing, `${label} occupation explanation`);
    assertReadableTextIncludes(document.system.rules.fullText, document.system?.grants?.curse, `${label} occupation explanation`);
  }

  if (document.type === "archetype") {
    for (const blessing of document.system?.blessingOptions ?? []) {
      assertReadableTextIncludes(document.system.rules.fullText, blessing.name, `${label} archetype explanation`);
      assertReadableTextIncludes(document.system.rules.fullText, blessing.effect, `${label} archetype explanation`);
    }

    for (const curse of document.system?.curseOptions ?? []) {
      assertReadableTextIncludes(document.system.rules.fullText, curse.name, `${label} archetype explanation`);
      assertReadableTextIncludes(document.system.rules.fullText, curse.effect, `${label} archetype explanation`);
    }
  }

  if (document.type === "theology") {
    assert(Array.isArray(document.system?.aliases) && document.system.aliases.length >= 3, `${label} must include Theology aliases`);
    assert(Array.isArray(document.system?.stereotypes) && document.system.stereotypes.length >= 3, `${label} must include Theology stereotypes`);
    assert(Boolean(document.system?.associatedSampleGod), `${label} must link its associated sample god`);
    assert(Boolean(document.system?.blessing?.name), `${label} must include a Theology Blessing`);
    assert(Boolean(document.system?.curse?.name), `${label} must include a Theology Curse`);
    assert(Number.isInteger(document.system?.grants?.resources?.freeTime), `${label} must include Free Time grant`);
    assert(Number.isInteger(document.system?.grants?.resources?.wealth), `${label} must include Wealth grant`);
    assert(document.system.grants.resources.freeTime >= 0, `${label} Free Time grant must be non-negative`);
    assert(document.system.grants.resources.wealth >= 0, `${label} Wealth grant must be non-negative`);
    assertPositiveRatings(document.system?.grants?.skills, characterSkillKeys, 5, `${label} Theology skills`);
    assertPositiveRatings(document.system?.grants?.manifestations, characterManifestationKeys, 3, `${label} Theology manifestations`);
    assertReadableTextIncludes(document.system.rules.fullText, document.system.associatedSampleGod, `${label} theology explanation`);
    assertReadableTextIncludes(document.system.rules.fullText, `Free Time ${document.system.grants.resources.freeTime}`, `${label} theology explanation`);
    assertReadableTextIncludes(document.system.rules.fullText, `Wealth ${document.system.grants.resources.wealth}`, `${label} theology explanation`);
    assertReadableTextIncludes(document.system.rules.fullText, document.system.blessing.name, `${label} theology explanation`);
    assertReadableTextIncludes(document.system.rules.fullText, document.system.blessing.effect, `${label} theology explanation`);
    assertReadableTextIncludes(document.system.rules.fullText, document.system.curse.name, `${label} theology explanation`);
    assertReadableTextIncludes(document.system.rules.fullText, document.system.curse.effect, `${label} theology explanation`);
  }
}

function assertRatings(ratings, keys, label) {
  for (const key of keys) {
    assert(Number.isInteger(ratings?.[key]), `${label} must include integer rating for ${key}`);
    assert(ratings?.[key] >= 0, `${label} rating for ${key} must be non-negative`);
  }
}

function assertResource(resource, label) {
  assert(Number.isInteger(resource?.value), `${label} must include integer value`);
  assert(Number.isInteger(resource?.max), `${label} must include integer max`);
  assert(resource?.value >= 0, `${label} value must be non-negative`);
  assert(resource?.max >= 0, `${label} max must be non-negative`);
  assert(resource?.value <= resource?.max, `${label} value must not exceed max`);
}

function assertActorSystem(document, label) {
  assert(document.type === "character", `${label} must be a character Actor`);
  assert(Boolean(document.system?.identity), `${label} must include system.identity`);
  assert(Boolean(document.system?.identity?.concept), `${label} must include system.identity.concept`);
  assert(Boolean(document.system?.identity?.occupation), `${label} must include system.identity.occupation`);
  assert(Boolean(document.system?.identity?.archetype), `${label} must include system.identity.archetype`);
  assert(Boolean(document.system?.identity?.dominion), `${label} must include system.identity.dominion`);
  assert(Boolean(document.system?.identity?.theology), `${label} must include system.identity.theology`);
  assertResource(document.system?.resources?.health, `${label} health`);
  assertResource(document.system?.resources?.psyche, `${label} psyche`);
  assertResource(document.system?.resources?.fragments, `${label} fragments`);
  assert(Number.isInteger(document.system?.resources?.spark), `${label} must include integer Spark`);
  assert(Number.isInteger(document.system?.resources?.freeTime), `${label} must include integer Free Time`);
  assert(Number.isInteger(document.system?.resources?.wealth), `${label} must include integer Wealth`);
  assert(Boolean(document.system?.derived), `${label} must include system.derived`);
  assert(Number.isInteger(document.system?.derived?.initiative), `${label} must include source initiative`);
  assert(Number.isInteger(document.system?.derived?.strength), `${label} must include source strength`);
  assert(Number.isInteger(document.system?.derived?.movement), `${label} must include source movement`);
  assertRatings(document.system?.skills, characterSkillKeys, `${label} skills`);
  assertRatings(document.system?.manifestations, characterManifestationKeys, `${label} manifestations`);
  assert(Boolean(document.system?.attachments), `${label} must include system.attachments`);
  assert(Boolean(document.system?.notes), `${label} must include system.notes`);
  assert(document.prototypeToken?.actorLink === true, `${label} prototype token should be linked`);
}

function assertRollTableSystem(document, label) {
  assert(Boolean(document.formula), `${label} must include a roll formula`);
  assert(Array.isArray(document.results) && document.results.length > 0, `${label} must include table results`);

  const resultIds = new Set();
  for (const result of document.results ?? []) {
    const resultLabel = `${label} result ${result.name ?? "(unnamed)"}`;
    const resultSource = result.flags?.[moduleId]?.source;

    assert(Boolean(result._id), `${resultLabel} must include a stable _id`);
    assertFoundryId(result._id, resultLabel);
    assert(!resultIds.has(result._id), `${label} has duplicate result _id: ${result._id}`);
    resultIds.add(result._id);

    assert(result.type === "text", `${resultLabel} must be a text result`);
    assert(Boolean(result.name), `${resultLabel} must include result name`);
    assert(!Object.hasOwn(result, "text"), `${resultLabel} must not use deprecated result.text`);
    assert(typeof result.description === "string", `${resultLabel} must include a result description string`);
    assert(Array.isArray(result.range) && result.range.length === 2, `${resultLabel} must include a numeric range`);
    assert(Number.isInteger(result.range?.[0]), `${resultLabel} range minimum must be an integer`);
    assert(Number.isInteger(result.range?.[1]), `${resultLabel} range maximum must be an integer`);
    assert(result.range?.[0] <= result.range?.[1], `${resultLabel} range minimum must not exceed maximum`);
    assert(Number.isInteger(result.weight) && result.weight > 0, `${resultLabel} must include a positive integer weight`);
    assert(result.drawn === false, `${resultLabel} should not be pre-drawn`);
    assert(resultSource?.title === "Infinite Sparks", `${resultLabel} must identify Infinite Sparks as its source`);
    assertSourcePages(resultSource?.pdfPages, resultLabel);
  }
}

async function validateDataModule({ relativePath, exportName, packName, documentType }) {
  const moduleUrl = pathToFileURL(join(root, relativePath)).href;
  const dataModule = await import(moduleUrl);
  const documents = dataModule[exportName];
  const importIds = new Set();
  const documentIds = new Set();
  const pack = manifest.packs?.find((entry) => entry.name === packName);

  assert(Boolean(pack), `${relativePath} references missing pack ${packName}`);
  assert(pack?.type === documentType, `${packName} should be a ${documentType} pack for ${relativePath}`);
  assert(Array.isArray(documents), `${relativePath} export ${exportName} must be an array`);
  assertNoSourceMaterialReference(documents, `${relativePath} ${exportName}`);

  for (const document of documents ?? []) {
    const label = `${relativePath} document ${document.name ?? "(unnamed)"}`;
    const flags = document.flags?.[moduleId] ?? {};
    const importId = flags.importId;
    const source = flags.source;

    assert(Boolean(document._id), `${label} must include a stable _id`);
    assertFoundryId(document._id, label);
    assert(!documentIds.has(document._id), `${relativePath} has duplicate document _id: ${document._id}`);
    documentIds.add(document._id);

    assert(Boolean(importId), `${label} must include flags.${moduleId}.importId`);
    assert(!importIds.has(importId), `${relativePath} has duplicate importId: ${importId}`);
    importIds.add(importId);

    assert(Boolean(flags.contentVersion), `${label} must include flags.${moduleId}.contentVersion`);
    assert(source?.title === "Infinite Sparks", `${label} must identify Infinite Sparks as its source`);
    assertSourcePages(source?.pdfPages, label);

    if (documentType === "Item") {
      assertItemSystem(document, label);
    }

    if (documentType === "Actor") {
      assertActorSystem(document, label);
    }

    if (documentType === "JournalEntry") {
      assert(Array.isArray(document.pages) && document.pages.length > 0, `${label} must include JournalEntry pages`);

      const pageIds = new Set();
      for (const page of document.pages ?? []) {
        const pageLabel = `${label} page ${page.name ?? "(unnamed)"}`;
        const pageSource = page.flags?.[moduleId]?.source;

        assert(Boolean(page._id), `${pageLabel} must include a stable _id`);
        assertFoundryId(page._id, pageLabel);
        assert(!pageIds.has(page._id), `${label} has duplicate page _id: ${page._id}`);
        pageIds.add(page._id);

        assert(page.type === "text", `${pageLabel} must be a text page`);
        assert(Boolean(page.text?.content), `${pageLabel} must include text.content`);
        assert(pageSource?.title === "Infinite Sparks", `${pageLabel} must identify Infinite Sparks as its source`);
        assertSourcePages(pageSource?.pdfPages, pageLabel);
      }
    }

    if (documentType === "RollTable") {
      assertRollTableSystem(document, label);
    }
  }
}

await validateDataModule({
  relativePath: "scripts/data/rules-reference.mjs",
  exportName: "RULES_REFERENCE_JOURNALS",
  packName: "rules-reference",
  documentType: "JournalEntry"
});

await validateDataModule({
  relativePath: "scripts/data/character-options.mjs",
  exportName: "CHARACTER_OPTION_ITEMS",
  packName: "character-options",
  documentType: "Item"
});

await validateDataModule({
  relativePath: "scripts/data/premade-actors.mjs",
  exportName: "PREMADE_ACTORS",
  packName: "premade-actors",
  documentType: "Actor"
});

await validateDataModule({
  relativePath: "scripts/data/random-tables.mjs",
  exportName: "RANDOM_TABLES",
  packName: "random-tables",
  documentType: "RollTable"
});

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
