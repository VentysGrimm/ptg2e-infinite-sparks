# PTG2e Infinite Sparks

A Foundry Virtual Tabletop module scaffold for **Infinite Sparks**, a supplemental book for **Part-Time Gods 2e**.

This repository is set up to become a source-backed module. The PDF and extracted working files belong in `source-material/`, which is intentionally ignored by Git so licensed source files do not leak into commits or releases.

## Development Layout

- `module.json` - Foundry package manifest.
- `scripts/` - Module entry points and future automation.
- `styles/` - Module-scoped CSS.
- `languages/` - Localization strings.
- `packs/` - Placeholder compendium pack directories.
- `docs/` - Project notes and source workflow.
- `source-material/` - Local-only source PDF, extracted text, and scratch files.
- `tools/` - Validation and packaging helpers.

## Source Material

Put the PDF here:

```text
source-material/PTG2e_Infinite_Sparks.pdf
```

The source folder is ignored by Git and should stay out of release archives.

## Validation

Run the local scaffold check with:

```powershell
node tools/validate-package.mjs
```

or:

```powershell
npm run validate
```

The validator checks the manifest, referenced module assets, pack paths, and whether `source-material/` has accidentally been tracked.

## Foundry Development Install

For local development, place or link this folder into your Foundry user data modules directory as:

```text
Data/modules/ptg2e-infinite-sparks
```

Then enable **PTG2e Infinite Sparks** in a world using the **Part-Time Gods 2e** system.

