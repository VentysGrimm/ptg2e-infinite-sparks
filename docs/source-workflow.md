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

## Authoring Principles

- Use the PDF as the source of truth.
- Prefer readable, organized journals over raw page dumps.
- Build compendium-native content so users only need to enable the module and browse/import packs.
- Keep extracted text, images, and caches local unless they are transformed into module-safe content.

