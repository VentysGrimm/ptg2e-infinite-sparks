export const MODULE_ID = "ptg2e-infinite-sparks";
export const SOURCE_TITLE = "Infinite Sparks";
export const SOURCE_BOOK = "Infinite Sparks, A Part-Time Gods Second Edition Companion";
const DEFAULT_COST = {
  freeTime: 0,
  wealth: 0,
  pantheonDice: 0,
  fragments: 0,
  health: 0,
  psyche: 0,
  strain: 0
};

const SKILL_LABELS = {
  athletics: "Athletics",
  crafts: "Crafts",
  deception: "Deception",
  discipline: "Discipline",
  empathy: "Empathy",
  fighting: "Fighting",
  fortitude: "Fortitude",
  influence: "Influence",
  intuition: "Intuition",
  knowledge: "Knowledge",
  marksman: "Marksman",
  medicine: "Medicine",
  might: "Might",
  perception: "Perception",
  perform: "Perform",
  speed: "Speed",
  stealth: "Stealth",
  survival: "Survival",
  tech: "Tech",
  travel: "Travel"
};

const MANIFESTATION_LABELS = {
  aegis: "Aegis",
  beckon: "Beckon",
  journey: "Journey",
  minion: "Minion",
  oracle: "Oracle",
  puppetry: "Puppetry",
  ruin: "Ruin",
  shaping: "Shaping",
  soul: "Soul"
};

const SKILL_KEYS = Object.keys(SKILL_LABELS);
const MANIFESTATION_KEYS = Object.keys(MANIFESTATION_LABELS);

export function slugify(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function escapeHTML(text) {
  return String(text ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[character]);
}

export function paragraph(text) {
  return `<p>${escapeHTML(text)}</p>`;
}

export function paragraphs(...texts) {
  return texts.filter((text) => String(text ?? "").trim()).map((text) => paragraph(text)).join("");
}

function heading(level, text) {
  const safeLevel = Math.min(6, Math.max(2, Number(level) || 2));
  return `<h${safeLevel}>${escapeHTML(text)}</h${safeLevel}>`;
}

function list(items = []) {
  const entries = items.filter((item) => String(item ?? "").trim());
  if (entries.length === 0) return "";

  return `<ul>${entries.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>`;
}

function titledParagraph(title, text) {
  return `<p><strong>${escapeHTML(title)}:</strong> ${escapeHTML(text)}</p>`;
}

function normalizePdfPages(pdfPages) {
  const pages = Array.isArray(pdfPages) ? pdfPages : [pdfPages];
  return [...new Set(pages.map((page) => Number(page)).filter((page) => Number.isInteger(page)))].sort((a, b) => a - b);
}

export function formatSourceLabel(pdfPages) {
  const pages = normalizePdfPages(pdfPages);

  if (pages.length === 0) return SOURCE_TITLE;
  if (pages.length === 1) return `${SOURCE_TITLE}, PDF p. ${pages[0]}`;

  const first = pages[0];
  const last = pages[pages.length - 1];
  const contiguous = pages.every((page, index) => page === first + index);

  return contiguous
    ? `${SOURCE_TITLE}, PDF pp. ${first}-${last}`
    : `${SOURCE_TITLE}, PDF pp. ${pages.join(", ")}`;
}

export function makeSource(pdfPages, extra = {}) {
  const normalizedPages = normalizePdfPages(pdfPages);

  return {
    title: SOURCE_TITLE,
    book: SOURCE_BOOK,
    pdfPages: normalizedPages,
    label: formatSourceLabel(normalizedPages),
    ...extra
  };
}

function firstPdfPage(pdfPages) {
  return normalizePdfPages(pdfPages)[0] ?? null;
}

function defaultIcon(type) {
  const icons = {
    occupation: "icons/tools/smithing/anvil-steel-grey.webp",
    archetype: "icons/sundries/documents/document-symbol-circle-brown.webp",
    theology: "icons/magic/holy/prayer-hands-glowing-yellow.webp",
    bond: "icons/sundries/documents/document-sealed-red.webp",
    relic: "icons/commodities/treasure/token-runed-os-grey.webp",
    worshipper: "icons/environment/people/group.webp",
    RollTable: "icons/svg/d20-grey.svg"
  };

  return icons[type] ?? "icons/svg/item-bag.svg";
}

function foundryId(seed) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let first = 0x811c9dc5;
  let second = 0x9e3779b9;

  for (const character of String(seed)) {
    const code = character.charCodeAt(0);
    first = Math.imul(first ^ code, 16777619) >>> 0;
    second = Math.imul(second + code, 2246822519) >>> 0;
  }

  let state = (BigInt(first) << 32n) | BigInt(second);
  let value = "";

  for (let index = 0; index < 16; index += 1) {
    state = (state * 6364136223846793005n + 1442695040888963407n) & ((1n << 64n) - 1n);
    value += alphabet[Number(state % BigInt(alphabet.length))];
  }

  return value;
}

function normalizeRollRange(range) {
  if (Array.isArray(range)) {
    const [minimum, maximum = minimum] = range.map((value) => Number(value));
    return [minimum, maximum];
  }

  const match = String(range).trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);
  if (!match) return [1, 1];

  const minimum = Number(match[1]);
  const maximum = Number(match[2] ?? match[1]);
  return [minimum, maximum];
}

function tableResultFlags(source, moduleFlags = {}) {
  return Object.keys(moduleFlags).length > 0
    ? {
        [MODULE_ID]: {
          source,
          ...moduleFlags
        }
      }
    : {
        [MODULE_ID]: {
          source
        }
      };
}

function defaultUsage(overrides = {}) {
  return {
    kind: overrides.kind ?? "narrative",
    trigger: overrides.trigger ?? "",
    target: overrides.target ?? "",
    cost: {
      ...DEFAULT_COST,
      ...(overrides.cost ?? {})
    }
  };
}

function defaultAutomation(overrides = {}) {
  return {
    enabled: overrides.enabled ?? false,
    action: overrides.action ?? "",
    bonus: overrides.bonus ?? null,
    penalty: overrides.penalty ?? null,
    roll: overrides.roll ?? null,
    healing: overrides.healing ?? null,
    damage: overrides.damage ?? null,
    condition: overrides.condition ?? null,
    resourceChange: overrides.resourceChange ?? null,
    chatCard: overrides.chatCard ?? true
  };
}

function makeRules({ type, name, pdfPages, summary, fullText }) {
  return {
    summary,
    fullText: fullText ?? paragraph(summary),
    source: {
      book: SOURCE_BOOK,
      page: firstPdfPage(pdfPages),
      section: name,
      type
    }
  };
}

function normalizeGrants(grants = {}) {
  return {
    skills: grants.skills ?? {},
    manifestations: grants.manifestations ?? {},
    resources: grants.resources ?? {},
    attachments: grants.attachments ?? {},
    blessing: grants.blessing ?? "",
    curse: grants.curse ?? ""
  };
}

export function attachmentOption(kind, name, level) {
  return {
    kind,
    name,
    level,
    choiceKind: kind,
    choiceLabel: name,
    requiresDefinition: true
  };
}

function abilityRules({ type, name, pdfPages, effect, fullText }) {
  return makeRules({
    type,
    name,
    pdfPages,
    summary: effect,
    fullText
  });
}

function abilityUsage(type, { pantheonDice = 1 } = {}) {
  return defaultUsage({
    kind: "triggered",
    trigger: type === "curse" ? "complication" : "fictional trigger",
    target: "self"
  });
}

function abilityAutomation(type, { pantheonDice = 1 } = {}) {
  return defaultAutomation({
    action: type === "curse" ? "gain-pantheon-dice" : "",
    resourceChange: type === "curse" ? { resource: "pantheon", amount: pantheonDice } : null
  });
}

export function blessingOption(name, effect, pdfPages) {
  const fullText = paragraph(effect);

  return {
    name,
    effect: fullText,
    rulesText: fullText,
    usageKind: "triggered",
    rules: abilityRules({ type: "blessing", name, pdfPages, effect, fullText }),
    usage: abilityUsage("blessing"),
    automation: abilityAutomation("blessing"),
    automationNotes: ""
  };
}

export function curseOption(name, effect, pdfPages, { pantheonDice = 1 } = {}) {
  const fullText = paragraph(effect);

  return {
    name,
    effect: fullText,
    rulesText: fullText,
    pantheonDice,
    usageKind: "triggered",
    rules: abilityRules({ type: "curse", name, pdfPages, effect, fullText }),
    usage: abilityUsage("curse", { pantheonDice }),
    automation: abilityAutomation("curse", { pantheonDice }),
    automationNotes: ""
  };
}

export function skillList(skills = {}) {
  return Object.entries(skills)
    .filter(([, value]) => Number(value) !== 0)
    .map(([key, value]) => `${SKILL_LABELS[key] ?? key} +${value}`)
    .join(", ");
}

function attachmentList(attachments = []) {
  return attachments.map((attachment) => `Level ${attachment.level} ${attachment.name}`).join("; ");
}

function attachmentLines(attachments = []) {
  return attachments.map((attachment) => `Level ${attachment.level} ${attachment.name} (${attachment.kind})`);
}

function abilitySection(title, abilities = []) {
  return [
    heading(3, title),
    ...abilities.map((ability) => titledParagraph(ability.name, ability.effect))
  ].join("");
}

function ratingBlock(keys, values = {}) {
  return Object.fromEntries(keys.map((key) => [key, Number(values[key] ?? 0)]));
}

function resourcePool(value, max = value) {
  const normalizedMax = Math.max(0, Number(max ?? value ?? 0));
  const normalizedValue = Math.max(0, Math.min(Number(value ?? normalizedMax), normalizedMax));

  return {
    value: normalizedValue,
    max: normalizedMax
  };
}

function defaultMortality() {
  return {
    state: "alive",
    timer: "",
    notes: "",
    lastTransitionAt: "",
    reconstitutionDue: "",
    devouredByUuid: "",
    devouredByName: "",
    log: []
  };
}

function formatPlainList(entries = []) {
  return entries.filter((entry) => String(entry ?? "").trim()).map((entry) => `- ${entry}`).join("\n");
}

function attachmentFields(attachments = {}) {
  return {
    bonds: formatPlainList(attachments.bonds),
    failings: formatPlainList(attachments.failings),
    relics: formatPlainList(attachments.relics),
    truths: formatPlainList(attachments.truths),
    vassals: formatPlainList(attachments.vassals),
    worshippers: formatPlainList(attachments.worshippers),
    blessings: formatPlainList(attachments.blessings),
    curses: formatPlainList(attachments.curses)
  };
}

function formatSpecialties({ skill = "", manifestation = "" } = {}) {
  return [
    skill ? `Skill: ${skill}` : "",
    manifestation ? `Manifestation: ${manifestation}` : ""
  ].filter(Boolean).join("\n");
}

function dominionPortfolio(dominion) {
  return String(dominion ?? "").replace(/\s+\([^)]+\)\s*$/, "");
}

function actorNotes({ source, derived, notes = [] }) {
  return paragraphs(
    source.label,
    `Source sheet values: Initiative +${Number(derived.initiative ?? 0)}, Strength ${Number(derived.strength ?? 0)}, Movement ${Number(derived.movement ?? 0)}.`,
    ...notes
  );
}

export function makeItem({
  id,
  type,
  name,
  importId,
  contentVersion,
  pdfPages,
  summary,
  fullText,
  system = {},
  usage = {},
  automation = {},
  moduleFlags = {},
  systemFlags = {}
}) {
  const source = makeSource(pdfPages);
  const rules = system.rules ?? makeRules({ type, name, pdfPages, summary, fullText });

  return {
    _id: id ?? foundryId(importId),
    name,
    type,
    img: system.img ?? defaultIcon(type),
    system: {
      ...system,
      rules,
      usage: system.usage ?? defaultUsage(usage),
      automation: system.automation ?? defaultAutomation(automation)
    },
    flags: {
      [MODULE_ID]: {
        importId,
        contentVersion,
        source,
        ...moduleFlags
      },
      "part-time-gods": {
        source: SOURCE_TITLE,
        page: firstPdfPage(pdfPages) ?? 0,
        slug: slugify(name),
        sourceId: `${MODULE_ID}.${importId}`,
        ...systemFlags
      }
    }
  };
}

export function makeCharacterActor({
  name,
  importId,
  contentVersion,
  pdfPages,
  identity,
  resources = {},
  derived = {},
  skills = {},
  manifestations = {},
  specialties = {},
  attachments = {},
  notes = [],
  img = "icons/svg/mystery-man.svg"
}) {
  const source = makeSource(pdfPages, {
    type: "sample-god",
    section: name
  });
  const normalizedSkills = ratingBlock(SKILL_KEYS, skills);
  const normalizedManifestations = ratingBlock(MANIFESTATION_KEYS, manifestations);
  const spark = Number(resources.spark ?? 1);
  const healthMax = Math.max(1, Number(resources.healthMax ?? normalizedSkills.fortitude + spark + 5));
  const psycheMax = Math.max(1, Number(resources.psycheMax ?? normalizedSkills.discipline + spark + 5));
  const fragmentsMax = Math.max(0, Number(resources.fragmentsMax ?? spark * 3));
  const actorDerived = {
    initiative: Number(derived.initiative ?? normalizedSkills.perception + normalizedSkills.speed),
    strength: Number(derived.strength ?? Math.max(1, normalizedSkills.might)),
    movement: Number(derived.movement ?? Math.max(1, normalizedSkills.speed)),
    armor: Number(derived.armor ?? 0),
    carriedWeight: Number(derived.carriedWeight ?? 0),
    conditionWarnings: []
  };
  const dominion = identity.dominion ?? "";
  const dominionTitle = identity.dominionTitle ?? identity.epithet ?? dominion;

  return {
    _id: foundryId(importId),
    name,
    type: "character",
    img,
    system: {
      identity: {
        concept: identity.concept ?? dominionTitle,
        ageEthnicity: identity.ageEthnicity ?? "",
        occupation: identity.occupation ?? "",
        archetype: identity.archetype ?? "",
        dominion,
        dominionTitle,
        dominionPortfolio: identity.dominionPortfolio ?? dominionPortfolio(dominion),
        dominionSpecificity: identity.dominionSpecificity ?? "specific",
        dominionLimitations: identity.dominionLimitations ?? "",
        dominionLandmarkBondUuid: identity.dominionLandmarkBondUuid ?? "",
        dominionLandmarkBondName: identity.dominionLandmarkBondName ?? "",
        theology: identity.theology ?? ""
      },
      resources: {
        health: resourcePool(resources.health ?? healthMax, healthMax),
        psyche: resourcePool(resources.psyche ?? psycheMax, psycheMax),
        fragments: resourcePool(resources.fragments ?? fragmentsMax, fragmentsMax),
        pantheon: resourcePool(resources.pantheon ?? 0, resources.pantheonMax ?? 0),
        spark,
        permanentFragmentLoss: Number(resources.permanentFragmentLoss ?? 0),
        freeTime: Number(resources.freeTime ?? 0),
        freeTimeMax: Number(resources.freeTimeMax ?? resources.freeTime ?? 0),
        wealth: Number(resources.wealth ?? 0),
        wealthMax: Number(resources.wealthMax ?? resources.wealth ?? 0),
        occupationFreeTime: Number(resources.occupationFreeTime ?? resources.freeTime ?? 0),
        occupationWealth: Number(resources.occupationWealth ?? resources.wealth ?? 0),
        legendaryActs: resources.legendaryActs ?? "",
        xpGained: Number(resources.xpGained ?? 0),
        xpSpent: Number(resources.xpSpent ?? 0),
        xpPurchases: resources.xpPurchases ?? [],
        resourceLog: resources.resourceLog ?? []
      },
      mortality: defaultMortality(),
      derived: actorDerived,
      skills: normalizedSkills,
      manifestations: normalizedManifestations,
      attachments: attachmentFields(attachments),
      conditions: "",
      specialties: formatSpecialties(specialties),
      notes: actorNotes({ source, derived: actorDerived, notes })
    },
    prototypeToken: {
      name,
      actorLink: true,
      disposition: 1,
      texture: {
        src: img
      }
    },
    flags: {
      [MODULE_ID]: {
        importId,
        contentVersion,
        source,
        kind: "sample-god"
      },
      "part-time-gods": {
        source: SOURCE_TITLE,
        page: firstPdfPage(pdfPages) ?? 0,
        slug: slugify(name),
        sourceId: `${MODULE_ID}.${importId}`
      }
    }
  };
}

export function makeOccupationCareer({ family, career, contentVersion }) {
  const name = `${career.name} (${family.name})`;
  const pdfPages = career.pdfPages ?? family.pdfPages;
  const attachments = (career.attachments ?? []).map((attachment) => ({
    ...attachment,
    sourcePage: firstPdfPage(pdfPages)
  }));
  const blessing = blessingOption(career.blessing.name, career.blessing.effect, pdfPages);
  const curse = curseOption(career.curse.name, career.curse.effect, pdfPages);
  const summary = `${career.name} is an Infinite Sparks ${family.name} career option with Free Time ${career.freeTime} and Wealth ${career.wealth}.`;
  const fullText = [
    heading(2, name),
    paragraph(career.description),
    heading(3, "Character Creation"),
    list([
      `Occupation family: ${family.name}`,
      `Career: ${career.name}`,
      `Free Time ${career.freeTime}`,
      `Wealth ${career.wealth}`,
      `Occupation Skills: ${skillList(family.skills)}`
    ]),
    heading(3, "Attachment Choice"),
    list(attachmentLines(attachments)),
    abilitySection("Blessing", [career.blessing]),
    abilitySection("Curse", [career.curse]),
    heading(3, "Rules Use"),
    paragraph("Choose this career during occupation selection. The listed skills, Free Time, Wealth, attachment choice, Blessing, and Curse are the complete source-backed grants for this career.")
  ].join("");

  return makeItem({
    type: "occupation",
    name,
    importId: `character-options.occupation.${slugify(family.name)}.${slugify(career.name)}`,
    contentVersion,
    pdfPages,
    summary,
    fullText,
    system: {
      category: family.name,
      career: career.name,
      careerOptions: [],
      grants: normalizeGrants({
        skills: family.skills,
        resources: {
          freeTime: career.freeTime,
          wealth: career.wealth
        },
        attachments: {
          options: attachments
        },
        blessing: blessing.name,
        curse: curse.name
      }),
      description: fullText,
      notes: paragraph(makeSource(pdfPages).label)
    },
    usage: {
      kind: "passive",
      trigger: "character creation",
      target: "self"
    },
    automation: {
      action: "apply-occupation-career"
    },
    moduleFlags: {
      kind: "occupation-career",
      family: family.name
    }
  });
}

export function makeArchetype({ archetype, contentVersion }) {
  const attachments = (archetype.attachments ?? []).map((attachment) => ({
    ...attachment,
    sourcePage: firstPdfPage(archetype.pdfPages)
  }));
  const blessings = (archetype.blessings ?? []).map((blessing) => blessingOption(blessing.name, blessing.effect, archetype.pdfPages));
  const curses = (archetype.curses ?? []).map((curse) => curseOption(curse.name, curse.effect, archetype.pdfPages));
  const summary = `${archetype.name} is an Infinite Sparks archetype defined by ${archetype.definingTrait.toLowerCase()}.`;
  const fullText = [
    heading(2, archetype.name),
    paragraph(archetype.description),
    heading(3, "Character Creation"),
    list([
      `Defining trait: ${archetype.definingTrait}`,
      `Archetype Skills: ${skillList(archetype.skills)}`
    ]),
    heading(3, "Attachment Choice"),
    list(attachmentLines(attachments)),
    abilitySection("Blessings", archetype.blessings),
    abilitySection("Curses", archetype.curses),
    heading(3, "Rules Use"),
    paragraph("Choose this archetype during Step Two of character creation. Select one listed attachment option, one Blessing, and one Curse; the options above are the complete source-backed choices for this archetype.")
  ].join("");

  return makeItem({
    type: "archetype",
    name: archetype.name,
    importId: `character-options.archetype.${slugify(archetype.name)}`,
    contentVersion,
    pdfPages: archetype.pdfPages,
    summary,
    fullText,
    system: {
      definingTrait: archetype.definingTrait,
      attachmentOptions: attachments,
      blessingOptions: blessings,
      curseOptions: curses,
      grants: normalizeGrants({
        skills: archetype.skills,
        attachments: {
          options: attachments
        }
      }),
      description: fullText,
      notes: paragraph(makeSource(archetype.pdfPages).label)
    },
    usage: {
      kind: "passive",
      trigger: "character creation",
      target: "self"
    },
    automation: {
      action: "apply-archetype-choice"
    },
    moduleFlags: {
      kind: "archetype-choice"
    }
  });
}

export function makeTextPage({ id, name, pdfPages, level = 1, content }) {
  const source = makeSource(pdfPages);

  return {
    _id: id,
    name,
    type: "text",
    title: {
      show: true,
      level
    },
    text: {
      format: 1,
      content: `${content.trim()}\n<footer class="ptg2e-is-source-note">${source.label}</footer>`
    },
    flags: {
      [MODULE_ID]: {
        source
      }
    }
  };
}

export function makeJournal({ id, name, importId, contentVersion, pdfPages, pages }) {
  const source = makeSource(pdfPages);

  return {
    _id: id,
    name,
    type: "base",
    pages: pages.map((page, index) => ({
      ...makeTextPage(page),
      sort: (index + 1) * 100000
    })),
    flags: {
      [MODULE_ID]: {
        importId,
        contentVersion,
        source
      }
    }
  };
}

export function makeRollTable({
  id,
  name,
  importId,
  contentVersion,
  pdfPages,
  formula = "1d10",
  description = "",
  entries = [],
  moduleFlags = {},
  systemFlags = {}
}) {
  const source = makeSource(pdfPages, {
    type: "random-table",
    section: name
  });

  return {
    _id: id ?? foundryId(importId),
    name,
    img: defaultIcon("RollTable"),
    description: [
      description ? paragraph(description) : "",
      paragraph(source.label)
    ].join(""),
    formula,
    replacement: true,
    displayRoll: true,
    results: entries.map((entry, index) => {
      const range = normalizeRollRange(entry.range);

      return {
        _id: entry.id ?? foundryId(`${importId}.result.${index}.${entry.text}`),
        type: 0,
        text: entry.text,
        img: entry.img ?? defaultIcon("RollTable"),
        weight: Number(entry.weight ?? (range[1] - range[0] + 1)),
        range,
        drawn: false,
        flags: tableResultFlags(source, entry.moduleFlags)
      };
    }),
    flags: {
      [MODULE_ID]: {
        importId,
        contentVersion,
        source,
        kind: "random-table",
        ...moduleFlags
      },
      "part-time-gods": {
        source: SOURCE_TITLE,
        page: firstPdfPage(pdfPages) ?? 0,
        slug: slugify(name),
        sourceId: `${MODULE_ID}.${importId}`,
        ...systemFlags
      }
    }
  };
}
