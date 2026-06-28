import { MODULE_ID } from "./foundry-builders.mjs";
import { CHARACTER_OPTION_ITEMS } from "./character-options.mjs";
import { PREMADE_ACTORS } from "./premade-actors.mjs";
import { RANDOM_TABLES } from "./random-tables.mjs";
import { RULES_REFERENCE_JOURNALS } from "./rules-reference.mjs";

const PACKS = [
  {
    collection: `${MODULE_ID}.rules-reference`,
    documentName: "JournalEntry",
    documents: RULES_REFERENCE_JOURNALS
  },
  {
    collection: `${MODULE_ID}.character-options`,
    documentName: "Item",
    documents: CHARACTER_OPTION_ITEMS
  },
  {
    collection: `${MODULE_ID}.premade-actors`,
    documentName: "Actor",
    documents: PREMADE_ACTORS
  },
  {
    collection: `${MODULE_ID}.random-tables`,
    documentName: "RollTable",
    documents: RANDOM_TABLES
  }
];

function getDocumentClass(documentName) {
  return CONFIG[documentName]?.documentClass ?? globalThis[documentName];
}

async function withUnlockedPack(pack, operation) {
  const wasLocked = pack.locked;

  if (wasLocked) await pack.configure({ locked: false });

  try {
    return await operation();
  } finally {
    if (wasLocked) await pack.configure({ locked: true });
  }
}

function indexValues(index) {
  return typeof index?.values === "function" ? Array.from(index.values()) : Array.from(index ?? []);
}

function indexEntryId(entry) {
  return entry?._id ?? entry?.id;
}

function indexEntryFlag(entry, key) {
  return entry?.flags?.[MODULE_ID]?.[key];
}

async function deletePackDocument(documentClass, id, collection) {
  await documentClass.deleteDocuments([id], { pack: collection });
}

async function syncPack({ collection, documentName, documents }) {
  const pack = game.packs.get(collection);

  if (!pack) {
    console.warn(`${MODULE_ID} | Pack not found: ${collection}`);
    return { collection, created: 0, updated: 0, removed: 0, skipped: 0, missing: true };
  }

  const documentClass = getDocumentClass(documentName);

  if (!documentClass) {
    console.warn(`${MODULE_ID} | Document class not found for ${documentName}`);
    return { collection, created: 0, updated: 0, removed: 0, skipped: 0, missing: true };
  }

  return withUnlockedPack(pack, async () => {
    const existingDocuments = indexValues(await pack.getIndex({
      fields: [
        `flags.${MODULE_ID}.contentVersion`,
        `flags.${MODULE_ID}.importId`
      ]
    }));
    const existingByImportId = new Map();
    const existingById = new Map();

    for (const document of existingDocuments) {
      const id = indexEntryId(document);
      if (id) existingById.set(id, document);

      const importId = indexEntryFlag(document, "importId");
      if (importId) existingByImportId.set(importId, document);
    }

    const wantedImportIds = new Set(documents.map((document) => document.flags?.[MODULE_ID]?.importId).filter(Boolean));
    let created = 0;
    let updated = 0;
    let removed = 0;
    let skipped = 0;

    for (const document of existingDocuments) {
      const id = indexEntryId(document);
      const importId = indexEntryFlag(document, "importId");
      if (!id || !importId || wantedImportIds.has(importId)) continue;

      await deletePackDocument(documentClass, id, collection);
      removed += 1;
    }

    for (const data of documents) {
      const importId = data.flags?.[MODULE_ID]?.importId;
      const contentVersion = data.flags?.[MODULE_ID]?.contentVersion;
      const existing = existingByImportId.get(importId) ?? existingById.get(data._id);

      if (indexEntryFlag(existing, "contentVersion") === contentVersion) {
        skipped += 1;
        continue;
      }

      if (existing) {
        await deletePackDocument(documentClass, indexEntryId(existing), collection);
        updated += 1;
      } else {
        created += 1;
      }

      await documentClass.create(data, { pack: collection });
    }

    return { collection, created, updated, removed, skipped, missing: false };
  });
}

export async function populateInfiniteSparksCompendiums({ notify = false } = {}) {
  if (!game.user?.isGM) return [];

  const results = [];

  for (const pack of PACKS) {
    results.push(await syncPack(pack));
  }

  const changed = results.reduce((sum, result) => sum + result.created + result.updated + result.removed, 0);

  if (notify && changed > 0) {
    ui.notifications.info(`PTG2e Infinite Sparks populated ${changed} compendium document(s).`);
  }

  console.info(`${MODULE_ID} | Compendium population complete`, results);
  return results;
}
