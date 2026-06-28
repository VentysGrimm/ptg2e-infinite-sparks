import { makeRollTable, slugify } from "./foundry-builders.mjs";

const CONTENT_VERSION = "2026.06.27.1";
const D10 = "1d10";
const TWO_D10 = "2d10";

function result(range, text, moduleFlags = {}) {
  return {
    range,
    text,
    moduleFlags
  };
}

function table(name, pdfPages, entries, { formula = D10, description = "", moduleFlags = {} } = {}) {
  return makeRollTable({
    name,
    importId: `random-tables.${slugify(name)}`,
    contentVersion: CONTENT_VERSION,
    pdfPages,
    formula,
    description,
    entries,
    moduleFlags
  });
}

function rollAgainEntries(low, middle, high) {
  return [
    result(1, "Roll Again"),
    result("2-4", low),
    result("5-7", middle),
    result("8-10", high)
  ];
}

function twoChoiceEntries(first, second) {
  return [
    result("1-5", first),
    result("6-10", second)
  ];
}

const attachmentTables = [
  table("Random Attachments: Attachment Type", [116], [
    result("1-5", "Bonds", { nextTable: "Random Attachments: Bonds" }),
    result("6-10", "Entitlements", { nextTable: "Random Attachments: Entitlements" })
  ], {
    description: "Roll this first to determine whether the random Attachment is a Bond or Entitlement.",
    moduleFlags: { group: "attachments" }
  }),
  table("Random Attachments: Bonds", [116], [
    result("1-3", "+1 Individual Bond"),
    result("4-6", "+1 Group Bond"),
    result("7-9", "+1 Landmark Bond"),
    result(10, "GM Choice")
  ], {
    description: "Roll here when the attachment type result is Bonds.",
    moduleFlags: { group: "attachments", attachmentType: "bond" }
  }),
  table("Random Attachments: Entitlements", [116], [
    result("1-2", "+1 Relic"),
    result("3-4", "Vassal"),
    result("5-6", "+1 Worshipper"),
    result("7-8", "+1 Truth (counts as 2)"),
    result("9-10", "GM Choice")
  ], {
    description: "Roll here when the attachment type result is Entitlements.",
    moduleFlags: { group: "attachments", attachmentType: "entitlement" }
  })
];

const occupationClasses = [
  {
    name: "Educated",
    range: "1-2",
    subtypes: [
      { name: "Medical", range: "1-2", careers: ["Professional", "Scientist", "Therapist"] },
      { name: "Engineering", range: "3-4", careers: ["Architect", "Civil Engineer", "Mechanical Engineer"] },
      { name: "Academic", range: "5-6", careers: ["Explorer", "Professor", "Student"] },
      { name: "Sciences", range: "7-8", careers: ["Earth Sciences", "Life Sciences", "Social Sciences"] },
      { name: "Technicians", range: "9-10", careers: ["Drafter", "Field Technician", "Lab Tech"] }
    ]
  },
  {
    name: "Strangers",
    range: "3-4",
    subtypes: [
      { name: "Criminal", range: "1-2", careers: ["Big Time", "Sex Worker", "Small Time"] },
      { name: "Fringe", range: "3-4", careers: ["Homeless", "Religious", "Rural"] },
      { name: "Freelance", range: "5-6", careers: ["Creator", "Driver", "Online Personality"] },
      { name: "Unemployed", range: "7-8", careers: ["Kid", "Privileged", "Retired"] },
      { name: "GM Choice", range: "9-10" }
    ]
  },
  {
    name: "Low Class",
    range: "5-6",
    subtypes: [
      { name: "Blue Collar", range: "1-2", careers: ["Business Owner", "Manual Labor", "Minimum Wage"] },
      { name: "Creative", range: "3-4", careers: ["Artist", "Homemaker", "Performer"] },
      { name: "Service Industry", range: "5-6", careers: ["Chef", "Cosmetologist", "Mortician"] },
      { name: "Physical", range: "7-8", careers: ["Athlete", "Fighter", "Soldier"] },
      { name: "GM Choice", range: "9-10" }
    ]
  },
  {
    name: "Middle Class",
    range: "7-8",
    subtypes: [
      { name: "Pink Collar", range: "1-2", careers: ["Admin", "Designer", "Teacher"] },
      { name: "Peacekeepers", range: "3-4", careers: ["Detective", "Emergency Services", "Officer"] },
      { name: "Business Owner", range: "5-6", careers: ["Brick and Mortar", "Self-Employed", "Watering Hole"] },
      { name: "Trades", range: "7-8", careers: ["Construction", "Independent Contractor", "Mechanic"] },
      { name: "GM Choice", range: "9-10" }
    ]
  },
  {
    name: "High Class",
    range: "9-10",
    subtypes: [
      { name: "Commissions", range: "1-2", careers: ["Agent", "Broker", "Sales Rep"] },
      { name: "Community Service", range: "3-4", careers: ["Event Organizer", "Local Foundation", "Social Worker"] },
      { name: "Public Life", range: "5-6", careers: ["Celebrity", "Media", "Politician"] },
      { name: "White Collar", range: "7-8", careers: ["Computer Tech", "Executive", "Lawyer"] },
      { name: "GM Choice", range: "9-10" }
    ]
  }
];

const occupationTables = [
  table("Random Occupations: Class", [117], occupationClasses.map((entry) => result(entry.range, entry.name, {
    nextTable: `Random Occupations: ${entry.name} Subtypes`
  })), {
    description: "Roll this first to determine the broad occupation class.",
    moduleFlags: { group: "occupations", step: "class" }
  }),
  ...occupationClasses.map((entry) => table(`Random Occupations: ${entry.name} Subtypes`, [117], entry.subtypes.map((subtype) => result(subtype.range, subtype.name, subtype.careers ? {
    nextTable: `Random Occupations: ${subtype.name} Careers`
  } : {})), {
    description: `Roll here after the class result is ${entry.name}.`,
    moduleFlags: { group: "occupations", step: "subtype", occupationClass: entry.name }
  })),
  ...occupationClasses.flatMap((entry) => entry.subtypes
    .filter((subtype) => subtype.careers)
    .map((subtype) => table(`Random Occupations: ${subtype.name} Careers`, [117], rollAgainEntries(...subtype.careers), {
      description: `Roll here after the occupation subtype result is ${subtype.name}.`,
      moduleFlags: { group: "occupations", step: "career", occupationClass: entry.name, subtype: subtype.name }
    })))
];

const archetypeThemes = [
  {
    name: "Chaos Is Destiny",
    range: "1-2",
    archetypes: [
      {
        name: "The Trickster",
        range: "1-3",
        attachment: ["+2 Landmark Bond Levels", "+2 Relic Levels"],
        blessings: ["Choice of Games", "Mercurial", "Unbelievably Believable"],
        curses: ["I Use My Words", "What a Fun Game!"]
      },
      {
        name: "The Demon",
        range: "4-6",
        attachment: ["+2 Vassal Bond Levels", "+2 Worshipper Bond Levels"],
        blessings: ["Its Own Reward", "Materialism", "Tempter"],
        curses: ["Demonic Wrath", "Want to Make a Deal?"]
      },
      {
        name: "The Doomed",
        range: "7-9",
        attachment: ["+2 Group Bond Levels", "+2 Individual Bond Levels"],
        blessings: ["Death Wish", "Learn From Mistakes", "The Upside"],
        curses: ["Hanged Man", "Ticking Clock"]
      },
      { name: "GM Choice", range: 10 }
    ]
  },
  {
    name: "Leaving Mark on the World",
    range: "3-4",
    archetypes: [
      {
        name: "Hero",
        range: "1-2",
        attachment: ["+2 Individual Bond Levels", "+2 Landmark Bond Levels"],
        blessings: ["I'm your Opponent Now", "Made of Sturdy Stuff", "Final Blow"],
        curses: ["A Hero's Plight", "Overconfident"]
      },
      {
        name: "Rebel",
        range: "3-4",
        attachment: ["+2 Group Bond Levels", "+2 Vassal Bond Levels"],
        blessings: ["Disrupt the System", "Hoarder", "Revolutionary"],
        curses: ["Chaotic", "Loner"]
      },
      {
        name: "The Judge",
        range: "5-6",
        attachment: ["+2 Group Bond Levels", "+2 Vassal Bond Levels"],
        blessings: ["Into Submission", "On the Scene", "Truth Seeker"],
        curses: ["My Mission", "Show Mercy"]
      },
      {
        name: "Wanderer",
        range: "7-8",
        attachment: ["+2 Group Bond Levels", "+2 Relic Levels"],
        blessings: ["I Know a Shortcut", "This is my Town", "Testing Limits"],
        curses: ["Holes in my Pockets", "Nomadic Tendencies"]
      },
      { name: "GM Choice", range: "9-10" }
    ]
  },
  {
    name: "Provide Structure To Life",
    range: "5-6",
    archetypes: [
      {
        name: "Caregiver",
        range: "1-3",
        attachment: ["+2 Individual Bond Levels", "+2 Landmark Bond Levels"],
        blessings: ["Adrenaline Kicks In", "Gift for the Team", "First-Aid"],
        curses: ["I Know Best", "Mess with Them and You Mess with Me"]
      },
      {
        name: "Dreamer",
        range: "4-6",
        attachment: ["+2 Landmark Bond Levels", "+2 Relic Levels"],
        blessings: ["Freedom in All Things", "Keep on Creating", "Stroke of Genius"],
        curses: ["Daydreaming", "Perfectionist"]
      },
      {
        name: "Tyrant",
        range: "7-9",
        attachment: ["+2 Group Bond Levels", "+2 Vassal Levels"],
        blessings: ["Authoritarian", "Entitled", "Fate's Compliance"],
        curses: ["Home to Roost", "Sand Through My Fingers"]
      },
      { name: "GM Choice", range: 10 }
    ]
  },
  {
    name: "Connecting with Others",
    range: "7-8",
    archetypes: [
      {
        name: "Companion",
        range: "1-2",
        attachment: ["+2 Worshipper Bond Levels", "+2 Group Bond Levels"],
        blessings: ["Community Leader", "Fairness", "Making Friends"],
        curses: ["Identity Crisis", "Loyal to a Fault"]
      },
      {
        name: "Fool",
        range: "3-4",
        attachment: ["+2 Individual Bond Levels", "+2 Group Bond Levels"],
        blessings: ["For You", "Life O' the Party", "Road Trip!"],
        curses: ["Big Mouth", "Like a Grasshopper, Not an Ant"]
      },
      {
        name: "The Shadow",
        range: "5-6",
        attachment: ["+2 Individual Bond Levels", "+2 Group Bond Levels"],
        blessings: ["The Best Defense", "Chaotic Mind", "You're Like Me"],
        curses: ["Bring Out Your Worst", "Unkind Skeletons"]
      },
      {
        name: "Lover",
        range: "7-8",
        attachment: ["+2 Individual Bond Levels", "+2 Group Bond Levels"],
        blessings: ["As You Wish", "Beyond Pleasurable", "Inviting Nature"],
        curses: ["I Want What You Have", "You Don't Like It?"]
      },
      { name: "GM Choice", range: "9-10" }
    ]
  },
  {
    name: "Seeks Paradise",
    range: "9-10",
    archetypes: [
      {
        name: "Innocent",
        range: "1-2",
        attachment: ["+2 Group Bond Levels", "+2 Landmark Bond Levels"],
        blessings: ["Average Joe", "Martyrdom", "Trying New Things"],
        curses: ["Out of my Depths", "Trust First"]
      },
      {
        name: "Sage",
        range: "3-4",
        attachment: ["+2 Group Bond Levels", "+2 Worshipper Bond Levels"],
        blessings: ["All Planned Out", "Genius", "Outthink the Enemy"],
        curses: ["All This Knowledge, For What?", "Contemplative"]
      },
      {
        name: "The Chaste",
        range: "5-6",
        attachment: ["+2 Individual Bond Levels", "+2 Worshipper Bond Levels"],
        blessings: ["Faith's Protection", "Steadfast", "Veil of Innocence"],
        curses: ["Hopeless Optimism", "Refusal"]
      },
      {
        name: "Visionary",
        range: "7-8",
        attachment: ["+2 Individual Bond Levels", "+2 Worshipper Bond Levels"],
        blessings: ["Make Things Happen", "Opportunity Knocks", "Scope Out"],
        curses: ["Not a Mind Reader", "Remember Me?"]
      },
      { name: "GM Choice", range: "9-10" }
    ]
  }
];

const archetypeEntries = archetypeThemes.flatMap((theme) => theme.archetypes.filter((entry) => entry.attachment));

const archetypeTables = [
  table("Random Archetypes: Drive", [118, 119], archetypeThemes.map((entry) => result(entry.range, entry.name, {
    nextTable: `Random Archetypes: ${entry.name}`
  })), {
    description: "Roll this first to determine the character's archetype drive.",
    moduleFlags: { group: "archetypes", step: "drive" }
  }),
  ...archetypeThemes.map((theme) => table(`Random Archetypes: ${theme.name}`, [118, 119], theme.archetypes.map((entry) => result(entry.range, entry.name, entry.attachment ? {
    nextTables: [
      `Random Archetypes: ${entry.name} Attachment`,
      `Random Archetypes: ${entry.name} Blessings`,
      `Random Archetypes: ${entry.name} Curses`
    ]
  } : {})), {
    description: `Roll here after the drive result is ${theme.name}.`,
    moduleFlags: { group: "archetypes", step: "archetype", drive: theme.name }
  })),
  ...archetypeEntries.flatMap((entry) => [
    table(`Random Archetypes: ${entry.name} Attachment`, [118, 119], twoChoiceEntries(...entry.attachment), {
      description: `Roll here for the ${entry.name} random Attachment result.`,
      moduleFlags: { group: "archetypes", step: "attachment", archetype: entry.name }
    }),
    table(`Random Archetypes: ${entry.name} Blessings`, [118, 119], rollAgainEntries(...entry.blessings), {
      description: `Roll here for the ${entry.name} random Blessing result.`,
      moduleFlags: { group: "archetypes", step: "blessing", archetype: entry.name }
    }),
    table(`Random Archetypes: ${entry.name} Curses`, [118, 119], twoChoiceEntries(...entry.curses), {
      description: `Roll here for the ${entry.name} random Curse result.`,
      moduleFlags: { group: "archetypes", step: "curse", archetype: entry.name }
    })
  ])
];

const dominionCategories = [
  { name: "Bestial", range: "2-4" },
  { name: "Conceptual", range: "5-7" },
  { name: "Elemental", range: "8-10" },
  { name: "Emotional", range: "11-13" },
  { name: "Patron", range: "14-16" },
  { name: "Tangible", range: "17-19" },
  { name: "Crossover", range: 20 }
];

const dominionPartOne = {
  name: "Part One",
  chartRange: "1-5",
  pdfPages: [120],
  entries: {
    Bestial: ["Cattle", "Serpents", "Monkeys", "Octopuses", "Elephants", "Spiders", "Lions", "Coyotes", "Foxes", "Eagles", "Rhinos", "Jaguars", "Bees", "Wolves", "Vermin", "Vultures", "Sharks", "Raccoons", "Beasts"],
    Conceptual: ["Revenge", "Marriage", "Wisdom", "Morality", "Celebration", "Justice", "Hospitality", "Creativity", "Romance", "Truth/Lies", "Beauty", "Loyalty", "Communication", "Family", "The Law", "Glory", "Secrets", "Balance", "Names"],
    Elemental: ["Mountains", "Thunder", "Flowers", "Ice", "Storms", "Gold", "Forests", "Mist", "Deserts", "Void", "Jewels", "Shadows", "Light", "Fire", "The Wind", "The Ocean", "The Earth", "Sun/Moon", "Weather"],
    Emotional: ["Mourning", "Surprise", "Cruelty", "Laughter", "Depression", "Envy", "Courage", "Patience", "Anxiety", "Disgust", "Rage", "Kindness", "Desire", "Reflection", "Ecstasy", "Joy", "Trust", "Love", "Fear"],
    Patron: ["Artists", "Warriors", "Virgins", "Thieves", "Shepherds", "Archers", "Librarians", "Entertainers", "Taxi Drivers", "Gamblers", "Merchants", "Journalists", "Lost Souls", "Smiths", "Mothers", "Cooks", "Wine", "Racers", "Travelers"],
    Tangible: ["Filth", "Coffee", "Technology", "Sex", "Fertility", "Bones", "Mirrors", "Blades", "Cars", "Pollution", "Strength", "Colors", "Slaughter", "Mechanics", "Medicine", "Sickness", "Hunger", "Androgyny", "Wealth"],
    Crossover: ["Fashion", "The Hunt", "Death", "Rebirth", "Trickery", "Day/Night", "Dreams", "Science", "Chaos", "Sports", "Leadership", "Agriculture", "Music", "Hearth", "Luck", "War", "Oaths", "Time", "Season (choose one)"]
  }
};

const dominionPartTwo = {
  name: "Part Two",
  chartRange: "6-10",
  pdfPages: [121],
  entries: {
    Bestial: ["Butterflies", "Chameleons", "Hawks", "Coral", "Dolphins", "Armadillos", "Hyenas", "Kangaroos", "Pandas", "Seagulls", "Hippos", "Cheetahs", "Wasps", "Tigers", "Rabbits", "Rats", "Bears", "Sealife", "Insects"],
    Conceptual: ["Politics", "The Weird", "Submission", "Domination", "Discovery", "Popularity", "Unity", "Racism", "Possibilities", "Conspiracies", "Nostalgia", "Feminism", "Clues", "Friendship", "Triumph", "Bigotry", "Scams", "Cringe", "Adventure"],
    Elemental: ["Nature", "Lightning", "Dust", "Rain", "Earthquakes", "Metals", "Hurricanes", "Leaves", "Electricity", "Sand", "Salt", "Crystals", "Gas", "Heat", "The Sky", "Rainbows", "Frost", "Stars", "Weed"],
    Emotional: ["Anticipation", "Humility", "Pride", "Greed", "Annoyance", "Happiness", "Lust", "Jealousy", "Hate", "Aggravation", "Manipulation", "Worry", "Apathy", "Distrust", "Rage", "Bravery", "Weariness", "Confidence", "Desperation"],
    Patron: ["Fathers", "Downtown", "Mechanics", "Writers", "Advisors", "Detectives", "Fools", "Lost Children", "Central Park", "Protectors", "Cheesemakers", "Pets", "Corporate Sector", "Lawyers", "Fencers", "Siblings", "Actors", "The Blind", "Voters"],
    Tangible: ["Cages", "Television", "Strength", "Tears", "Wounds", "Asylums", "Feasts", "Tattoos", "Credit Ratings", "Pestilence", "Tournaments", "Social Media", "Harvest", "Tea", "Childbirth", "Stealing", "Speech", "Computers", "Graffiti"],
    Crossover: ["Journeys", "Gluttony", "Charity", "Peace", "Sacrifice", "Burnout", "Games", "Freedom", "Stress", "Crime", "Security", "Sports", "Health", "Youth", "Adulthood", "Pilots", "News", "Learning", "Inspiration"]
  }
};

const dominionBlessings = {
  Bestial: ["Beast Tongue", "Ferocity", "Frenzy"],
  Conceptual: ["Beacon", "Mental Guard", "Tongues"],
  Elemental: ["Destructive Nature", "Elemental Strength", "In My Element"],
  Emotional: ["Fuel My Fire", "Siphon", "Soothing Aura"],
  Patron: ["Divinely Skilled", "Loved and Worshipped", "Patron's Blessing"],
  Tangible: ["Call Me Master", "Finder's Keepers", "Immunity"],
  Crossover: ["Adaptable", "Learning from Others", "Reactive Curses"]
};

const dominionCurses = {
  Bestial: ["Animal Mind", "Not My Kind"],
  Conceptual: ["Bizzaro-God", "Led By My Power"],
  Elemental: ["Connected to the Land", "Tech Allergy"],
  Emotional: ["Apathetic", "Overcome with Emotion"],
  Patron: ["Fox in the Henhouse", "Let's See What You Got"],
  Tangible: ["Everything's a Nail", "Utterly Alone"],
  Crossover: ["Prideful", "Unpredictable"]
};

function dominionNumberedEntries(values) {
  return values.map((text, index) => result(index + 2, text));
}

function dominionTypeEntries(part) {
  return dominionCategories.map((category) => result(category.range, category.name, {
    nextTables: [
      `Random Dominions: ${part.name} ${category.name}`,
      `Random Dominions: ${category.name} Blessings`,
      `Random Dominions: ${category.name} Curses`
    ]
  }));
}

const dominionParts = [dominionPartOne, dominionPartTwo];

const dominionTables = [
  table("Random Dominions: Chart", [120, 121], dominionParts.map((part) => result(part.chartRange, `Dominions (${part.name.toLowerCase()})`, {
    nextTable: `Random Dominions: ${part.name} Type`
  })), {
    description: "Roll this first to determine which Dominion chart to use.",
    moduleFlags: { group: "dominions", step: "chart" }
  }),
  ...dominionParts.flatMap((part) => [
    table(`Random Dominions: ${part.name} Type`, part.pdfPages, dominionTypeEntries(part), {
      formula: TWO_D10,
      description: `Roll here after the chart result is Dominions (${part.name.toLowerCase()}).`,
      moduleFlags: { group: "dominions", step: "type", part: part.name }
    }),
    ...dominionCategories.map((category) => table(`Random Dominions: ${part.name} ${category.name}`, part.pdfPages, dominionNumberedEntries(part.entries[category.name]), {
      formula: TWO_D10,
      description: `Roll here after the ${part.name} type result is ${category.name}.`,
      moduleFlags: { group: "dominions", step: "dominion", part: part.name, dominionType: category.name }
    }))
  ]),
  ...dominionCategories.flatMap((category) => [
    table(`Random Dominions: ${category.name} Blessings`, [120, 121], rollAgainEntries(...dominionBlessings[category.name]), {
      description: `Roll here for a ${category.name} Dominion Blessing.`,
      moduleFlags: { group: "dominions", step: "blessing", dominionType: category.name }
    }),
    table(`Random Dominions: ${category.name} Curses`, [120, 121], twoChoiceEntries(...dominionCurses[category.name]), {
      description: `Roll here for a ${category.name} Dominion Curse.`,
      moduleFlags: { group: "dominions", step: "curse", dominionType: category.name }
    })
  ])
];

const theologyTables = [
  table("Random Theologies", [121], [
    result(2, "Ascendants"),
    result(3, "New Imperium"),
    result(4, "Prayer Tenders"),
    result(5, "Cult of the Saints"),
    result(6, "Fenric Shackles"),
    result(7, "Order of Meskhenet"),
    result(8, "Hearthfire Society", { appendixVariant: "Heathfire Society" }),
    result(9, "Puck-Eaters"),
    result(10, "Coatlicue's Step-Children"),
    result(11, "Warlock's Fate"),
    result(12, "Crofters of Destiny"),
    result(13, "Masks of Jana"),
    result(14, "Gaea's Wardens", { appendixVariant: "Gaia's Wardens" }),
    result(15, "Phoenix Society"),
    result(16, "Nanuk's Outlanders"),
    result(17, "Drifting Kingdoms"),
    result(18, "Kunitsukami"),
    result(19, "Reliquarians"),
    result(20, "Player Choice")
  ], {
    formula: TWO_D10,
    description: "Roll 2d10 to determine a random Theology. Canonical chapter names are used where the appendix table has spelling variants.",
    moduleFlags: { group: "theologies" }
  })
];

export const RANDOM_TABLES = [
  ...attachmentTables,
  ...occupationTables,
  ...archetypeTables,
  ...dominionTables,
  ...theologyTables
].map((entry, index) => ({
  ...entry,
  sort: (index + 1) * 100000
}));
