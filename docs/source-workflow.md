# Source Workflow

This module should stay source-backed while keeping the licensed PDF local-only.

## Local Source Folder

Place the Infinite Sparks PDF at:

```text
source-material/PTG2e_Infinite_Sparks.pdf
```

Suggested local scratch layout:

```text
source-material/
  PTG2e_Infinite_Sparks.pdf
  .cache/
    text/
    images/
    source-index.json
```

Do not commit files from `source-material/`.

## Content Targets

- `packs/rules-reference` for readable rules journals.
- `packs/character-options` for PTG2e Items from the supplement.
- `packs/premade-actors` for NPCs, deities, archetypes, or sample characters.
- `packs/scenes-and-handouts` for ready-to-use scenes and player handouts.
- `packs/macros` for optional utility macros tied to the supplement.
- `packs/random-tables` for appendix RollTables.

## Source-Backed Data Pipeline

Versioned module-safe content lives in `scripts/data/`.

- `foundry-builders.mjs` centralizes slugging, source references, and Foundry document builders.
- `rules-reference.mjs` contains curated JournalEntry payloads with PDF-page source flags.
- `character-options.mjs` contains source-backed Occupation career and Archetype Item payloads from Chapter Two, including full readable rules explanations for each generated Item.
- `premade-actors.mjs` contains source-backed Chapter Three sample god character Actor payloads.
- `random-tables.mjs` contains source-backed appendix RollTable payloads from the rendered PDF pages.
- `premade-compendiums.mjs` creates or refreshes flagged compendium entries when a GM loads the module.

Each generated document stores `flags.ptg2e-infinite-sparks.importId`, `contentVersion`, and source metadata. Bump the content version for a document when its payload changes so the runtime populator refreshes it.

## Authoring Principles

- Use the PDF as the source of truth.
- Prefer readable, organized journals over raw page dumps.
- Build compendium-native content so users only need to enable the module and browse/import packs.
- Keep extracted text, images, and caches local unless they are transformed into module-safe content.
