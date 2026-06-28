import {
  makeCharacterActor,
  slugify
} from "./foundry-builders.mjs";

const CONTENT_VERSION = "2026-06-27.chapter-three-sample-gods.1";

function sampleGod(data) {
  return makeCharacterActor({
    importId: `premade-actors.sample-god.${slugify(data.name)}`,
    contentVersion: CONTENT_VERSION,
    ...data
  });
}

export const PREMADE_ACTORS = [
  sampleGod({
    name: "Miakoda Atreides",
    pdfPages: [58, 59],
    identity: {
      concept: "Goddess of Conspiracy",
      occupation: "Media (Public Life)",
      archetype: "Trickster",
      dominion: "Conspiracy (Conceptual)",
      dominionTitle: "Goddess of Conspiracy",
      theology: "Coatlicue's Step-Children"
    },
    resources: {
      freeTime: 5,
      wealth: 4,
      spark: 1
    },
    derived: {
      initiative: 3,
      strength: 2,
      movement: 8
    },
    skills: {
      athletics: 2,
      crafts: 1,
      deception: 3,
      discipline: 1,
      empathy: 0,
      fighting: 0,
      fortitude: 1,
      influence: 3,
      intuition: 2,
      knowledge: 3,
      marksman: 1,
      medicine: 0,
      might: 0,
      perception: 2,
      perform: 3,
      speed: 1,
      stealth: 4,
      survival: 0,
      tech: 3,
      travel: 0
    },
    manifestations: {
      aegis: 2,
      beckon: 0,
      journey: 0,
      minion: 0,
      oracle: 3,
      puppetry: 2,
      ruin: 0,
      shaping: 0,
      soul: 3
    },
    specialties: {
      skill: "Small Details",
      manifestation: "Locate"
    },
    attachments: {
      bonds: [
        "Michel - Editor (I)",
        "The Reservation (L)",
        "Conspiracy Club (G)",
        "Government Sector (L)"
      ],
      truths: [
        "The goddess of Conspiracy knows what you're thinking: communicate psychically with up to four targets in line of sight; spend 1 Fragment for an unwilling or out-of-sight target within 2 miles."
      ],
      vassals: [
        "Heather - Gorgon: Miakoda's partner and constant companion."
      ],
      blessings: [
        "Anything for the Story: +1 Stealth when breaking into places to uncover the truth.",
        "Choice of Games: choose one Skill for +1 at session start; spend 1 Pantheon Die to switch it.",
        "Beacon: take Dazed 2 to learn the next point of interest tied to Conspiracy on the Territory Grid.",
        "Step-Mother's Touch (1/2): approach non-hostile Outsiders safely or grant a mortal a Truth or limited Dominion effect."
      ],
      curses: [
        "Killed the Cat: gain 1 Pantheon Die when curiosity about a story causes trouble.",
        "I Use My Words: gain 1 Pantheon Die when weak physical contribution leaves the group in trouble.",
        "Led by My Power: gain 1 Pantheon Die when she follows a conspiracy thread at the cost of other duties.",
        "Atonement: ignoring the Vassal is harsher, and attacking an Outsider damages Health and Psyche until she atones."
      ]
    },
    notes: [
      "Sample god for Coatlicue's Step-Children and the Conspiracy Dominion.",
      "Miakoda is a public paranormal investigator whose divine life began when the hidden world proved real. She is cheerful in public, but struggles with keeping divine truth concealed."
    ]
  }),
  sampleGod({
    name: "Tavion Brooks",
    pdfPages: [62, 63],
    identity: {
      concept: "God of Names",
      occupation: "Construction (Trades)",
      archetype: "Demon",
      dominion: "Names (Conceptual)",
      dominionTitle: "God of Names",
      theology: "Crofters of Destiny"
    },
    resources: {
      freeTime: 5,
      wealth: 4,
      spark: 1
    },
    derived: {
      initiative: 5,
      strength: 6,
      movement: 10
    },
    skills: {
      athletics: 2,
      crafts: 3,
      deception: 2,
      discipline: 1,
      empathy: 0,
      fighting: 2,
      fortitude: 0,
      influence: 3,
      intuition: 2,
      knowledge: 3,
      marksman: 0,
      medicine: 0,
      might: 4,
      perception: 1,
      perform: 2,
      speed: 3,
      stealth: 1,
      survival: 0,
      tech: 1,
      travel: 0
    },
    manifestations: {
      aegis: 0,
      beckon: 0,
      journey: 1,
      minion: 0,
      oracle: 2,
      puppetry: 2,
      ruin: 2,
      shaping: 0,
      soul: 3
    },
    specialties: {
      skill: "First Impressions",
      manifestation: "Know Names"
    },
    attachments: {
      bonds: [
        "My Crew (G)",
        "Grand Library (L)"
      ],
      truths: [
        "All names are open to me: Tavion can speak and read any language.",
        "You won't like me when I'm angry: spend 1 Fragment to double size, triple weight, and gain Health, Armor, Strength, and Damage bonuses."
      ],
      worshippers: [
        "Divine Eyes: spend Strain or Free Time to learn Territory information.",
        "Zealots: cause Strain and roll to have followers complete a task over coming Scenes."
      ],
      blessings: [
        "Look Out: +1 Speed when dodging falling objects.",
        "It's Own Reward: roll after a successful Lead Followup to see whether the Attachment strains, heals, or changes Pantheon Dice.",
        "Fateful Existence: spend 1 Fragment to count 5+ as successes or remove Critical Failure risk for one roll."
      ],
      curses: [
        "Off-Season: roll at session start to see whether work is unavailable and Tavion cannot Go to Work.",
        "Demonic Wrath: gain 1 Pantheon Die when his anger erupts into violence, destruction, or chaos.",
        "Bizarro-God: gain 1 Pantheon Die when he forgets an important name.",
        "Fear of Power (1/2): Fateful Existence and higher-Spark gods create Planning, Influence, and Empathy penalties."
      ]
    },
    notes: [
      "Sample god for the Crofters of Destiny and the Names Dominion.",
      "Tavion understands names as leverage. The Crofters push him toward dismantling power structures, but his talent for manipulation risks turning him into the kind of force he opposes."
    ]
  }),
  sampleGod({
    name: "Vialle Kincaid",
    pdfPages: [66, 67],
    identity: {
      concept: "Goddess of Fencers",
      occupation: "Chef (Service Industry)",
      archetype: "Sage",
      dominion: "Fencers (Patron)",
      dominionTitle: "Goddess of Fencers",
      theology: "Fenric Shackles"
    },
    resources: {
      freeTime: 3,
      wealth: 4,
      spark: 1
    },
    derived: {
      initiative: 5,
      strength: 4,
      movement: 10
    },
    skills: {
      athletics: 2,
      crafts: 3,
      deception: 2,
      discipline: 0,
      empathy: 2,
      fighting: 3,
      fortitude: 0,
      influence: 2,
      intuition: 2,
      knowledge: 2,
      marksman: 2,
      medicine: 1,
      might: 2,
      perception: 1,
      perform: 2,
      speed: 3,
      stealth: 0,
      survival: 0,
      tech: 0,
      travel: 1
    },
    manifestations: {
      aegis: 1,
      beckon: 1,
      journey: 0,
      minion: 2,
      oracle: 0,
      puppetry: 2,
      ruin: 3,
      shaping: 1,
      soul: 0
    },
    specialties: {
      skill: "Swords",
      manifestation: "Sharpen"
    },
    attachments: {
      bonds: [
        "The Grilled Onion (L)",
        "Fencing Stadium (L)",
        "Thalia (I)"
      ],
      truths: [
        "She is the best of fencers: +1 Fighting with swords, and failed sword checks count as at least 1 success.",
        "The god can face down any threat: immune to fear effects, including Afraid."
      ],
      vassals: [
        "Grimlax (Enslaved): a Snarlequin Outsider bound by the Fenric Shackles."
      ],
      worshippers: [
        "Faithful: cause Strain to gain Fragments equal to current Level.",
        "Givers: cause Strain to gain Wealth equal to current Level."
      ],
      blessings: [
        "Kitchen Medic: +1 Medicine for patching small injuries.",
        "Outthink the Enemy: once per Battle, roll Discipline to reduce incoming mental damage.",
        "Patron's Blessing: grant +2 Fighting to a sword user within Near Range.",
        "Soul Chains: enslave Outsiders within Spark limits and empower enslaved Vassals.",
        "Power (Failing): reduces XP costs for several attachment types."
      ],
      curses: [
        "Quality Costs: gain 1 Pantheon Die when high-quality supplies cost +2 Wealth.",
        "All This Knowledge, For What?: gain 1 Pantheon Die when insecurity about usefulness creates conflict.",
        "Let's See What You Got: gain 1 Pantheon Die when a challenger arrives for a duel."
      ]
    },
    notes: [
      "Sample god for the Fenric Shackles and the Fencers Dominion.",
      "Vialle's restaurant and fencing life became tangled with jealousy, violence, and divinity. She now presents an approachable face while seeking recognition and power through the Fenric Shackles."
    ]
  }),
  sampleGod({
    name: "Brigida Hill",
    pdfPages: [70, 71],
    identity: {
      concept: "Goddess of Bears",
      occupation: "Teacher (Pink Collar)",
      archetype: "Companion",
      dominion: "Bears (Bestial)",
      dominionTitle: "Goddess of Bears",
      theology: "Gaea's Wardens"
    },
    resources: {
      freeTime: 4,
      wealth: 4,
      spark: 1
    },
    derived: {
      initiative: 3,
      strength: 4,
      movement: 9
    },
    skills: {
      athletics: 3,
      crafts: 0,
      deception: 0,
      discipline: 0,
      empathy: 4,
      fighting: 2,
      fortitude: 3,
      influence: 3,
      intuition: 2,
      knowledge: 1,
      marksman: 1,
      medicine: 2,
      might: 1,
      perception: 0,
      perform: 1,
      speed: 1,
      stealth: 2,
      survival: 3,
      tech: 0,
      travel: 1
    },
    manifestations: {
      aegis: 2,
      beckon: 2,
      journey: 1,
      minion: 2,
      oracle: 0,
      puppetry: 0,
      ruin: 1,
      shaping: 2,
      soul: 0
    },
    specialties: {
      skill: "Shadowing",
      manifestation: "Roar!!!"
    },
    attachments: {
      bonds: [
        "The Faculty (G)",
        "The Glen (L)"
      ],
      relics: [
        "Your Story Book: spend 1 Free Time to read it and gain a GM-guided sense of where she is, was, and is going."
      ],
      truths: [
        "Beasts Hear My Words: speak with bears for free or with other animals for 1 Fragment.",
        "The wild is the goddess' home: +1 Survival while living off the land, and failed checks count as at least 1 success.",
        "The Bear Goddess is Kind: touch a target and roll Medicine + Intuition to heal damage or lower Conditions."
      ],
      vassals: [
        "Oliver (Baby Bear): a young bear who is especially effective when hunting Pucks."
      ],
      worshippers: [
        "Mentor: cause Strain to reroll failed dice from one Empathy or Athletics check."
      ],
      blessings: [
        "Surrounded by Germs: +2 Fortitude to avoid illness.",
        "Community Leader: first Group Bond Lead Follow-up each session is free.",
        "Gaea's Blood (1/2): reduce Bleeding penalties, or take Bleeding to empower a Manifestation check.",
        "Vengeance: +2 on checks that lead Brigida to obtaining revenge."
      ],
      curses: [
        "Caught in the Wild: gain 1 Pantheon Die when a student spots her in public.",
        "Loyal to a Fault: gain 1 Pantheon Die when a divided loyalty costs her something.",
        "Animal Mind: gain 1 Pantheon Die when animal instinct disrupts normal social interaction.",
        "Modern Hatred: modern points of interest near her territory act as -1 Level.",
        "Vengeance: -2 to resist immediate revenge after a slight.",
        "Many Over the Few: gain 1 Pantheon Die when Theology orders conflict with personal or pantheon goals."
      ]
    },
    notes: [
      "Sample god for Gaea's Wardens and the Bears Dominion.",
      "Brigida's mantle came through compassion for an orphaned bear cub after a wilderness disaster. Her godhood draws worshippers, nature, and the demands of the Wardens into her everyday teaching life."
    ]
  }),
  sampleGod({
    name: "Sharon Dershowitz",
    pdfPages: [74, 75],
    identity: {
      concept: "Goddess of Graffiti",
      occupation: "Lawyer (White Collar)",
      archetype: "Judge",
      dominion: "Graffiti (Tangible)",
      dominionTitle: "Goddess of Graffiti",
      theology: "Hearthfire Society"
    },
    resources: {
      freeTime: 2,
      wealth: 8,
      spark: 1
    },
    derived: {
      initiative: 3,
      strength: 1,
      movement: 6
    },
    skills: {
      athletics: 0,
      crafts: 4,
      deception: 1,
      discipline: 1,
      empathy: 3,
      fighting: 0,
      fortitude: 0,
      influence: 3,
      intuition: 2,
      knowledge: 1,
      marksman: 1,
      medicine: 4,
      might: 1,
      perception: 1,
      perform: 1,
      speed: 1,
      stealth: 2,
      survival: 0,
      tech: 3,
      travel: 1
    },
    manifestations: {
      aegis: 0,
      beckon: 2,
      journey: 1,
      minion: 0,
      oracle: 2,
      puppetry: 2,
      ruin: 0,
      shaping: 1,
      soul: 2
    },
    specialties: {
      skill: "Spot Lies",
      manifestation: "Teleport to Tag"
    },
    attachments: {
      bonds: [
        "Maxim (Law Partner) (I)",
        "My Lovely Clients (G)",
        "Graffiti Alley (L)"
      ],
      relics: [
        "Mask of Many Faces: spend 1 Fragment to take the appearance, voice, and clothing of someone she interacted with that day."
      ],
      truths: [
        "The goddess sees who you truly are: spend 1 Fragment to sense divine power, perceive ghosts and spirits, and see Outsiders' true faces."
      ],
      worshippers: [
        "Temple Keepers: cause Strain to gain bonus dice for a Manifestation check equal to current Level."
      ],
      blessings: [
        "Closing Arguments: +1 Perform when orating before a crowd.",
        "On the Scene: spend 1 Pantheon Die to move 2 Territory Grid squares before calculating Free Time.",
        "Call Me Master: +2 to all checks involving Graffiti.",
        "Community Command: reduce costs for community purchases and count Spark as +1 for Sense Spark within her territory."
      ],
      curses: [
        "Well, Actually: gain 1 Pantheon Die when petty debate creates conflict.",
        "Show Mercy: gain 1 Pantheon Die when mercy creates future consequences.",
        "Utterly Alone: gain 1 Pantheon Die when isolation and lack of art remove her from the Scene.",
        "Everything is at Stake: Attachment loss worsens Failings, and Landmark Strain also damages Psyche."
      ]
    },
    notes: [
      "Sample god for the Hearthfire Society and the Graffiti Dominion.",
      "Sharon balances law, civic loyalty, and a rebellious artistic past. She uses her firm, clients, and graffiti community to strengthen the city as a living territory."
    ]
  }),
  sampleGod({
    name: "Jason Blalock",
    pdfPages: [78, 79],
    identity: {
      concept: "God of Fear",
      occupation: "Driver (Freelance)",
      archetype: "Doomed",
      dominion: "Fear (Emotional)",
      dominionTitle: "God of Fear",
      theology: "Nanuk's Outlanders"
    },
    resources: {
      freeTime: 6,
      wealth: 2,
      spark: 1
    },
    derived: {
      initiative: 5,
      strength: 2,
      movement: 10
    },
    skills: {
      athletics: 1,
      crafts: 1,
      deception: 0,
      discipline: 2,
      empathy: 2,
      fighting: 0,
      fortitude: 3,
      influence: 2,
      intuition: 1,
      knowledge: 1,
      marksman: 0,
      medicine: 1,
      might: 1,
      perception: 0,
      perform: 1,
      speed: 4,
      stealth: 1,
      survival: 3,
      tech: 2,
      travel: 4
    },
    manifestations: {
      aegis: 0,
      beckon: 2,
      journey: 0,
      minion: 3,
      oracle: 0,
      puppetry: 2,
      ruin: 0,
      shaping: 3,
      soul: 0
    },
    specialties: {
      skill: "Routes",
      manifestation: "Cower Crowd"
    },
    attachments: {
      bonds: [
        "Raquel, My Fixer (I)",
        "My Family (G)",
        "Outsider Community (G)",
        "Haunted Neighborhood (L)"
      ],
      relics: [
        "Horn of Plenty: a cornucopia that provides basic food from its place of origin whenever someone is hungry."
      ],
      truths: [
        "Beware looking upon the god of fear: spend 1 Fragment; mortals who look at Jason gain Convinced 1 each minute, while Spark-bearing beings can resist."
      ],
      vassals: [
        "Nigel - Satyr: Jason's drinking buddy and a local guide."
      ],
      blessings: [
        "Unintended Audience: +1 Perception to eavesdrop casually.",
        "Learn From Mistakes: add +1 extra Pantheon Die when a Critical Failure would add dice.",
        "Siphon: draw from a target's Fear to add Pantheon Dice, once per target per Scene.",
        "Brother-in-Arms (1/2): borrow an Outsider Payoff effect or spend 1 Fragment to avoid an Outsider attack."
      ],
      curses: [
        "Not Covered By Insurance: gain 1 Pantheon Die when car damage costs 2 Wealth.",
        "Ticking Clock: gain 1 Pantheon Die and lose 1 Free Time at the end of a Scene where no Curse activates.",
        "Apathetic: gain 1 Pantheon Die when becoming hardened and unemotional causes trouble.",
        "Monster Magnet (1/2): Outsiders are harder to face, and Outsider Community loss can permanently reduce Free Time."
      ]
    },
    notes: [
      "Sample god for Nanuk's Outlanders and the Fear Dominion.",
      "Jason was a joyful driver, husband, and father before inheriting the Fear Dominion from a strange passenger. He now tries to fit Outsider refugees and divine unease into an otherwise loving family life."
    ]
  }),
  sampleGod({
    name: "Andrej Antonov",
    pdfPages: [82, 83],
    identity: {
      concept: "God of Mist",
      occupation: "Agent (Commission Based)",
      archetype: "Shadow",
      dominion: "Mists (Elemental)",
      dominionTitle: "God of Mist",
      theology: "New Imperium"
    },
    resources: {
      freeTime: 2,
      wealth: 8,
      spark: 1
    },
    derived: {
      initiative: 5,
      strength: 2,
      movement: 7
    },
    skills: {
      athletics: 0,
      crafts: 0,
      deception: 3,
      discipline: 3,
      empathy: 1,
      fighting: 1,
      fortitude: 1,
      influence: 3,
      intuition: 3,
      knowledge: 2,
      marksman: 1,
      medicine: 0,
      might: 2,
      perception: 1,
      perform: 2,
      speed: 2,
      stealth: 2,
      survival: 0,
      tech: 1,
      travel: 2
    },
    manifestations: {
      aegis: 0,
      beckon: 3,
      journey: 2,
      minion: 0,
      oracle: 0,
      puppetry: 2,
      ruin: 2,
      shaping: 1,
      soul: 0
    },
    specialties: {
      skill: "Fast Talk",
      manifestation: "Summoning"
    },
    attachments: {
      bonds: [
        "Clint \"Roach\" Nelson (I)",
        "Labrynth Park (L)",
        "My Office (L)"
      ],
      relics: [
        "Obscuring Cigar: once per day, lighting it fills the area with smoke that inflicts Impaired Sight 2 on others while leaving the owner immune."
      ],
      truths: [
        "The god of mists cannot be blinded: darkness, rain, smoke, blindness, and Impaired Sight do not obstruct Andrej's vision."
      ],
      worshippers: [
        "Divine Eyes: spend Strain or Free Time to learn Territory information."
      ],
      blessings: [
        "Diamond in the Rough: +1 Intuition to tell what someone needs to hear.",
        "Chaotic Mind: successful resistance to mental aggression harms the attacker, with stronger effects on a Boost.",
        "Destructive Nature: +1 success toward Damage when using Mists to harm.",
        "Legion: spend 1 Fragment and roll Intuition + Perception to create bonus dice or alter a battlefield."
      ],
      curses: [
        "Have to Act Now: gain 1 Pantheon Die when a client opportunity makes him abandon another task.",
        "Bring Out Your Worst: gain 1 Pantheon Die when his words provoke someone's worst side.",
        "Connected to the Land: gain 1 Pantheon Die when a Landmark Bond takes outside Strain.",
        "Assuming Nobility: being one-upped inflicts Embarrassed until he proves superiority or deals with the slight.",
        "Many Over the Few: gain 1 Pantheon Die when Theology orders conflict with personal or pantheon goals.",
        "Wrangling Cats: gain 1 Pantheon Die when students create tension or problems."
      ]
    },
    notes: [
      "Sample god for the New Imperium and the Mists Dominion.",
      "Andrej is a New York agent and boxing manager who accepted divine power as a way to expand New Imperium influence. His confidence, network, and fighters all serve his code: get paid, leave a mark, and be known."
    ]
  }),
  sampleGod({
    name: "Joseph Cheung",
    pdfPages: [86, 87],
    identity: {
      concept: "God of Wolves",
      occupation: "Athlete (Physical)",
      archetype: "Caregiver",
      dominion: "Wolves (Bestial)",
      dominionTitle: "God of Wolves",
      theology: "Prayer Tenders"
    },
    resources: {
      freeTime: 3,
      wealth: 6,
      spark: 1
    },
    derived: {
      initiative: 7,
      strength: 4,
      movement: 13
    },
    skills: {
      athletics: 3,
      crafts: 0,
      deception: 0,
      discipline: 2,
      empathy: 2,
      fighting: 3,
      fortitude: 2,
      influence: 2,
      intuition: 1,
      knowledge: 0,
      marksman: 0,
      medicine: 2,
      might: 1,
      perception: 2,
      perform: 1,
      speed: 4,
      stealth: 1,
      survival: 1,
      tech: 0,
      travel: 3
    },
    manifestations: {
      aegis: 1,
      beckon: 0,
      journey: 1,
      minion: 3,
      oracle: 1,
      puppetry: 0,
      ruin: 1,
      shaping: 2,
      soul: 1
    },
    specialties: {
      skill: "Sprinting",
      manifestation: "Wolf Form"
    },
    attachments: {
      bonds: [
        "Duncan Clay - Rival (I)",
        "University (L)",
        "Howling Forest (L)",
        "Karen - Romantic (I)"
      ],
      truths: [
        "The god of wolves is quick to act: spend 1 Fragment to act first in a Round, ignoring established Initiative."
      ],
      worshippers: [
        "Sara - Chosen One: cause Strain to use Manifestations through the Worshipper.",
        "Preachers: cause Strain to reduce the cost of gaining a Worshipper level.",
        "Beggars: cause Strain and spend Wealth to ignore Damage or Conditions.",
        "Confidants: cause Strain to heal one type of damage and lower Conditions."
      ],
      blessings: [
        "On Your Marks: +1 Speed when racing the clock or another person.",
        "Adrenaline Kicks In: +2 Strength when protecting or helping someone he cares about.",
        "Frenzy: once per Battle, spend 1 Pantheon Die to add current damage as a bonus to the next attack.",
        "Craving Adulation (1/2): improves Worshipper Planning/Execution and Worshipper healing."
      ],
      curses: [
        "Dumb Jock: gain 1 Pantheon Die when assumptions about an athlete's intelligence damage interactions.",
        "Mess with Them and You Mess with Me: gain 1 Pantheon Die when an Individual Bond suffers outside Strain.",
        "Not My Kind: gain 1 Pantheon Die when non-canine animal interference causes problems.",
        "We Summon Thee (1/2): Worshipper need can teleport him away, and non-Worshipper Attachments act at -1 Level."
      ]
    },
    notes: [
      "Sample god for the Prayer Tenders and the Wolves Dominion.",
      "Joseph, also known as Cheung Gen, came from Binghu and became a god when wolves returned after a public murder. His speed brought him to an American university, while Sara and his followers help him navigate divine life."
    ]
  }),
  sampleGod({
    name: "Eli White",
    pdfPages: [90, 91],
    identity: {
      concept: "God of Learning",
      occupation: "Professor (Academic)",
      archetype: "Chaste",
      dominion: "Learning (Crossover)",
      dominionTitle: "God of Learning",
      theology: "Reliquarians"
    },
    resources: {
      freeTime: 3,
      wealth: 6,
      spark: 1
    },
    derived: {
      initiative: 4,
      strength: 1,
      movement: 7
    },
    skills: {
      athletics: 0,
      crafts: 3,
      deception: 0,
      discipline: 3,
      empathy: 1,
      fighting: 0,
      fortitude: 3,
      influence: 0,
      intuition: 2,
      knowledge: 4,
      marksman: 1,
      medicine: 2,
      might: 1,
      perception: 1,
      perform: 0,
      speed: 2,
      stealth: 1,
      survival: 1,
      tech: 3,
      travel: 0
    },
    manifestations: {
      aegis: 1,
      beckon: 1,
      journey: 2,
      minion: 0,
      oracle: 4,
      puppetry: 0,
      ruin: 0,
      shaping: 0,
      soul: 2
    },
    specialties: {
      skill: "Myths/Legends",
      manifestation: "Transcribe"
    },
    attachments: {
      bonds: [
        "Grandfather's House (L)",
        "Academic Community (G)",
        "Anna - Grandmother (I)"
      ],
      failings: [
        "Hoarding: suffers a penalty to resist pursuing Relics and may use limited Pantheon Dice without permission."
      ],
      relics: [
        "Library Book: once per session, teleport instantly to Grandfather's House; later uses cost 1 Fragment."
      ],
      truths: [
        "There are few things the god of learning doesn't know: +1 Knowledge for historical checks, and failed checks count as at least 1 success.",
        "Eli dreams, learning new things even in his sleep: prophetic death dreams may require Knowledge + Intuition to interpret."
      ],
      blessings: [
        "I Know Just the Book: +1 Speed when quickly researching a topic.",
        "Steadfast: +1 Discipline against distractions and +1 Fortitude against physical needs.",
        "Adaptable: spend Pantheon Dice to swap one Skill in a GM-called combo after the combo is announced.",
        "A Relic for Everything (1/2): sense Relics, ease Attunement, and create Level 1 Relics with permanent Fragment investment.",
        "Hoarding (Failing): may use up to 2 Pantheon Dice without permission each session."
      ],
      curses: [
        "A Slight Miscalculation: gain 1 Pantheon Die when a theory or plan is completely wrong and harms the group.",
        "Refusal: gain 1 Pantheon Die when refusing temptation leads to trouble.",
        "Prideful: gain 1 Pantheon Die when pride over a Crossover Dominion causes conflict.",
        "Hoarding (Failing): -2 to resist going after Relics he encounters."
      ]
    },
    notes: [
      "Sample god for the Reliquarians and the Learning Dominion.",
      "Eli inherited his Spark as a child from his grandfather and has turned his life into a pursuit of books, museums, travel, and obscure knowledge. His Reliquarian gifts make him valuable and vulnerable."
    ]
  })
];
