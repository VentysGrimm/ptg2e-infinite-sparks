# Infinite Sparks Module Content Catalogue

Source scanned: `source-material/PTG2E_InfiniteSparks_digital.pdf`

PDF facts:

- Title: `Infinite Sparks, A Part-Time Gods Second Edition Companion`
- PDF pages: 121
- Local extracted text cache: `source-material/.cache/text/`
- Rendered inspection pages: `tmp/pdfs/infinite-sparks-scan/`
- Page references below use PDF page numbers, not printed page labels.

## Priority List

| Priority | Build Area | Foundry Target | Why It Matters |
| --- | --- | --- | --- |
| 1 | Source-backed data pipeline | Scripts, validation docs | Every later pack depends on repeatable extraction, page citation, slugging, and system-schema mapping. |
| 2 | Core player character options | Item compendium plus rules journals | These are the main table-facing options players need during character creation and advancement. |
| 3 | Random generation tables | RollTable compendium | The appendix updates core random creation tables and makes the new options usable at the table. |
| 4 | Divine character options | Item compendium plus rules journals | Theologies, Entitlements, Relics, and Worshippers expand the central divine side of PTG2e. |
| 5 | Soulbound relics | Item compendium plus GM journals | Chapter Four adds a new relic framework with named high-impact story objects. |
| 6 | GM rules and guidance | Rules Reference journal pack | Pantheon Connections, drama guidance, active Bonds, barter, and credit need readable reference pages. |
| 7 | Premade actors and handouts | Actor and JournalEntry compendiums | The sample gods and story hooks turn the source into ready-to-use GM material. |
| 8 | Visual/media support | Assets, scenes, journal art | Useful for polish, but should only use distributable or generated assets unless this stays strictly private. |
| 9 | Release and install polish | Manifest, packaging, QA | Needed once the packs are populated and the new repo/release URLs exist. |

## Priority 1: Source-Backed Data Pipeline

Create these before heavy content entry:

| Needed | Output |
| --- | --- |
| Source index | `source-material/.cache/source-index.json` with chapter ranges, PDF pages, printed page labels if needed, and content families. |
| Text extraction workflow | Repeatable script that extracts page text into ignored cache files. |
| Visual extraction workflow | Render pages with complex tables/layouts for verification. |
| Content normalizer | Shared helpers for slugging names, preserving source page references, and cleaning PDF extraction artifacts. |
| Foundry document builders | Builders for JournalEntry, Item, Actor, and RollTable documents that match the Part-Time Gods system schema. |
| Validation | Checks for JSON validity, missing source refs, duplicate slugs/import IDs, missing pack paths, and accidental `source-material/` leakage. |

Current implemented slice:

- `scripts/data/foundry-builders.mjs` creates source-aware JournalEntry text pages, Item documents, character Actor documents, and RollTable documents.
- `scripts/data/rules-reference.mjs` starts the readable rules reference with Chapter One: When Gods Collide.
- `scripts/data/character-options.mjs` seeds 30 Occupation career Items and 6 Archetype Items from Chapter Two, with complete source-backed creation choices, resources, attachment choices, Blessings, Curses, and rules-use explanations.
- `scripts/data/premade-actors.mjs` seeds 9 Chapter Three sample god character Actors.
- `scripts/data/random-tables.mjs` seeds the appendix random-generation RollTables for Attachments, Occupations, Archetypes, Dominions, and Theologies.
- `scripts/data/premade-compendiums.mjs` populates flagged Rules Reference, Character Options, Premade Actors, and Random Tables compendium entries at GM ready.
- `tools/validate-package.mjs` validates data imports, duplicate IDs, source page ranges, source flags, Item rules metadata, Character Options explanation completeness, Actor system metadata, RollTable result ranges, and `source-material/` leakage.
- `tools/package-release.mjs` creates release-ready `dist/module.json` and `dist/module.zip` assets from the tracked module files while excluding local-only source and scratch folders.

Likely manifest/pack additions found by this scan:

- Added a `random-tables` RollTable pack.
- Consider splitting `character-options` into narrower packs once schema mapping is confirmed, such as `occupations-archetypes`, `divine-options`, and `relics`.

## Priority 2: Core Player Character Options

### New Occupations

Source range: PDF pages 23-36.

Create 30 Occupation subtype entries with skills, Free Time, Wealth, attachment choices, Blessing, Curse, and source reference.

| Occupation Family | Subtypes |
| --- | --- |
| Business Owner | Brick-and-Mortar, Self-Employed, Watering Hole |
| Commission Based | Agent, Broker, Sales Rep |
| Community Services | Event Organizer, Local Foundation, Social Worker |
| Engineering | Architect, Civil Engineer, Mechanical Engineer |
| Freelance | Creator, Driver, Online Personality |
| Pink Collar | Admin, Designer, Teacher |
| Sciences | Earth Sciences, Life Sciences, Social Sciences |
| Service Industry | Chef, Cosmetologist, Mortician |
| Technicians | Drafter, Field Technician, Lab Tech |
| Trades | Construction, Independent Contractor, Mechanic |

Foundry targets:

- Item entries if the PTG system has an occupation/trait-style item type.
- Otherwise JournalEntry pages plus optional drag-ready reference Items.

### New Archetypes

Source range: PDF pages 37-42.

Create six Archetype entries with skills, attachment choices, Blessings, Curses, and source reference.

- The Chaste
- The Demon
- The Doomed
- The Judge
- The Shadow
- The Trickster

### Active Bond Rules

Source range: PDF pages 43-45.

Create readable rules journal pages for:

- Lives Beyond the Gods
- Unavailability
- Busy People
- People, Not Props
- Thinking of You
- Reaching Out

### Unique Bonds

Source range: PDF pages 45-47.

Create bond option entries or rules pages for:

| Bond Type | Entries |
| --- | --- |
| Individuals | Soulmate, Personal Assistant |
| Groups | Neighborhood Association, Social Club |
| Landmarks | Jobsite, Bolthole |

### New Failings

Source range: PDF pages 47-48.

Create five Failing entries:

- Forgetfulness
- Inseparable
- Morbid
- Nightmares
- Trapped

### Free Time and Wealth Rules

Source range: PDF pages 48-51.

Create rules journal pages for:

- Fine-Tuning Occupations
- Decades of Experience
- Greener than Green
- Side Hustle
- Bartering
- Proposal
- Fulfillment
- Reneging
- Credit
- Layaway
- Credit Cards

## Priority 3: Random Generation Tables

Source range: PDF pages 116-121.

Implemented in `scripts/data/random-tables.mjs` as a dedicated RollTable pack. These tables were verified from rendered pages because the PDF text extraction flattens columns.

| Table | Foundry Output |
| --- | --- |
| Random Attachments | RollTable with nested or linked Bond/Entitlement results. |
| Random Occupations | Multi-step RollTables for class, subtype, and occupation. |
| Random Archetypes | Multi-step RollTables for drive, archetype, attachment, blessing, and curse. |
| Random Dominions Part One | RollTables for Dominion type, exact Dominion, Blessing, and Curse. |
| Random Dominions Part Two | RollTables for Dominion type, exact Dominion, Blessing, and Curse. |
| Random Theologies | 2d10 RollTable covering core and Infinite Sparks Theology results. |

Important note: the appendix table spells the city-building Theology as `Heathfire Society`, while the chapter heading and table of contents use `Hearthfire Society`. Use `Hearthfire Society` as canonical and note the appendix variant in the source notes.

## Priority 4: Divine Character Options

### New Theologies

Source range: PDF pages 55-91.

Create nine Theology entries with history/lifestyle summaries, aliases, stereotypes, skills, Manifestations, Free Time, Wealth, Blessings/Curses, and source reference.

| Theology | Associated Sample God |
| --- | --- |
| Coatlicue's Step-Children | Miakoda Atreides, Goddess of Conspiracy |
| Crofters of Destiny | Tavion Brooks, God of Names |
| Fenric Shackles | Vialle Kincaid, Goddess of Fencers |
| Gaea's Wardens | Brigida Hill, Goddess of Bears |
| Hearthfire Society | Sharon Dershowitz, Goddess of Graffiti |
| Nanuk's Outlanders | Jason Blalock, God of Fear |
| New Imperium | Andrej Antonov, God of Mist |
| Prayer Tenders | Joseph Cheung, God of Wolves |
| Reliquarians | Eli White, God of Learning |

Foundry targets:

- Theology Items if the PTG system supports them.
- Rules Reference journal pages for full read-through.
- Actor entries for the associated sample gods, if the system schema supports useful NPC/god actors.

### New Entitlements

Source range: PDF pages 92-94.

Create Entitlement entries or rules journals for:

- Theology Rank, levels 1-5: Initiate, Acolyte, Proctor, Master, Elder.
- Divine Ally, including Accompany, Commune, and Lead Followup rules.

### New Relics

Source range: PDF pages 95-98.

Create 13 Relic entries, grouped by level:

| Level | Relics |
| --- | --- |
| 1 | Ever-Flowing Bottle, Horn of Plenty, Spider's Rope |
| 2 | Eternal Flame, Spectacles of Truth, Web of Lies |
| 3 | Flying Carpet, Golden Fleece, Mask of Many Faces |
| 4 | Mirror Cage, Pistol of the Conquistador |
| 5 | Timepiece of Chronos, Voodoo Doll |

Also create an Ambrosia rules sidebar or special consumable/reference entry.

### New Relic Creation Options

Source range: PDF pages 98-99.

Create rule option entries for:

- Devouring
- Elemental Damage
- Elemental Effect
- Elemental Force Field
- Personal Weapon/Relic
- Spark Stealing

### New Worshippers

Source range: PDF pages 100-101.

Create Worshipper entries:

- Beggars
- Blasphemers
- Cultists
- Divine Eyes
- Mentor

## Priority 5: Soulbound Relics

### Soulbound Rules Framework

Source range: PDF pages 104-108.

Create rules journal pages for:

- Silent Ones
- The Fractured
- Awakened
- Soulbound Mechanics
- Soulbound Abilities: Fragments, Dominion/Manifestation, Powers, Brutal
- Soulbound Curses by type

### Soulbound of Renown

Source range: PDF pages 108-115.

Create eight named Soulbound Relic entries with type, last known location, Dominions/Manifestations, Fragments, unique powers, story hooks, and source reference.

- Ala's Shield
- Ba'al
- Cernunnos' Amulet
- The Great and Powerful Steve
- Lifebringer
- Musashi
- Thorbjorn the Godhand
- Triton

Foundry targets:

- Relic/Soulbound Items where supported.
- GM-facing JournalEntry pages for history and story hooks.
- Optional Macro helpers later for Fragment spending or story-hook randomization.

## Priority 6: GM Rules and Guidance

### Chapter One: When Gods Collide

Source range: PDF pages 9-19.

Create rules reference pages for:

- Pantheon Connections
- Connection Status
- Support With Connections
- Relationship Curses
- Changing Connections
- Occupations as Inspiration
- Archetypes as Inspiration
- Dominions as Inspiration
- Theologies as Inspiration
- Bringing the Drama
- Drama Is Not For Everyone
- Creating Drama
- Good Vs. Bad Drama
- Drama Scenes sidebar

These should be readable journals, not page dumps.

### Chapter Two and Three Rules Cross-References

The content above should also link back to:

- Active Bond rules.
- Free Time/Wealth expansion.
- Divine Ally and Theology Rank rules.
- Relic creation options.
- Worshipper rules.

## Priority 7: Premade Actors and Handouts

Implemented in `scripts/data/premade-actors.mjs` as source-backed character Actors:

- Miakoda Atreides
- Tavion Brooks
- Vialle Kincaid
- Brigida Hill
- Sharon Dershowitz
- Jason Blalock
- Andrej Antonov
- Joseph Cheung
- Eli White

Each Actor includes identity, source sheet values, skills, Manifestations, resources, specialties, attachments, concise notes, and source-page flags.

Create associated GM handout pages for:

- Theology histories and agendas.
- Sample god backgrounds and role in the setting.
- Soulbound last known locations and hooks.

## Priority 8: Visual and Scene Support

Potential additions:

- Cover or splash journal image only if distribution rights allow.
- Clean generated or original icons for Theologies, relic categories, and Soulbound types.
- Optional handout art for relics and Theologies.
- Optional scenes only if the book provides a map/diagram that can be reproduced safely or if we create original module-safe layouts.

Do not commit PDF images, extracted art, or source scans unless there is explicit distribution permission.

## Priority 9: Release and Install Polish

After content packs exist:

- Added repository URL, manifest URL, and download URL to `module.json`.
- Added release packaging that excludes `source-material/`, `tmp/`, and caches.
- Validate anonymous manifest/download installability.
- Add pack population or migration scripts if Foundry-generated pack data needs deterministic rebuilds.
- Add a final smoke test checklist for module activation in a Part-Time Gods world.

## Current Scaffold Gaps Found By This Scan

- Scenes/handouts and macros still need real generated content.
- The current broad `character-options` pack may become crowded once Theologies, Relics, Worshippers, and Soulbound entries are added.
- GM handouts for sample gods, Theology histories, and story hooks still need to be built.
- Item schema mapping needs confirmation before deciding whether Occupations, Archetypes, Failings, Bonds, Theologies, Relics, and Worshippers become Items, Journal pages, or both.
- The PDF contains extraction artifacts, so table data and names should be checked against rendered pages when entered.
