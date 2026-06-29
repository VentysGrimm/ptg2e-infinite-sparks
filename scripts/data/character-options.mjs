import {
  attachmentOption as attachment,
  makeArchetype,
  makeOccupationCareer,
  makeTheology
} from "./foundry-builders.mjs";

const CHAPTER_TWO_CONTENT_VERSION = "2026-06-27.chapter-two-character-options.2";
const THEOLOGY_CONTENT_VERSION = "2026-06-29.chapter-three-theologies.1";

const OCCUPATION_FAMILIES = [
  occupationFamily("Business Owner", [23, 24], {
    discipline: 1,
    intuition: 1,
    perception: 1,
    stealth: 1,
    tech: 1
  }, [
    career("Brick-and-Mortar", [23], 2, 3, [
      attachment("individual", "My Business Partner", 2),
      attachment("landmark", "My Store", 3)
    ], "Store owners compete with online giants, superstores, and changing technology while trying to remain relevant in their community.", blessing("Read the Signs", "Gain +1 Intuition, or +2 if My Business Partner was chosen, when anticipating which option other people prefer."), curse("Negative Reviews", "Gain +1 Pantheon Die when bad reviews damage the god's reputation and inflict Embarrassed 1 until the complaint is handled.")),
    career("Self-Employed", [24], 3, 3, [
      attachment("individual", "My Rival", 2),
      attachment("group", "My Favorite Customers", 2)
    ], "Self-employed gods command their own hours, take their own risks, and refuse to let other people define their worth.", blessing("Choose Your Hours", "At the start of each session, adjust Free Time and Wealth so each is at least 1 and their total is 6. If no change is made, add +1 Pantheon Die."), curse("Exhaustion", "Gain +1 Pantheon Die when the god is too tired to join a Battle. Each later Battle round after activating this Curse adds cumulative Ignored Limits 1.")),
    career("Watering Hole", [24], 3, 2, [
      attachment("group", "The Regulars", 3),
      attachment("landmark", "My Business", 3)
    ], "Watering-hole owners run the places where neighbors, dates, students, and local groups gather.", blessing("In the Know", "Gain +1 Influence when persuading or intimidating someone who frequents the watering hole, or +1 Fortitude when holding liquor."), curse("Problem Customers", "Gain +1 Pantheon Die when a disgruntled customer reappears and causes trouble for the group."))
  ]),
  occupationFamily("Commission Based", [24, 25], {
    deception: 1,
    discipline: 1,
    empathy: 1,
    fortitude: 1,
    influence: 1
  }, [
    career("Agent", [25], 2, 4, [
      attachment("group", "Other Agents", 2),
      attachment("individual", "The Talent", 2)
    ], "Agents represent talented clients, track industry trends, and succeed when their clients succeed.", blessing("Diamond in the Rough", "Gain +1 Intuition to read what someone probably needs to hear before they will consider agreeing with the god."), curse("Have to Act Now", "Gain +1 Pantheon Die when the god jumps on a golden opportunity for a client and leaves another important task undone.")),
    career("Broker", [25], 3, 3, [
      attachment("individual", "Boss", 2),
      attachment("group", "Broker Community", 2)
    ], "Brokers match buyers and sellers, manage information, and build reputations on efficient deals.", blessing("I Know My Stuff", "On a Boost when dealing with the broker's field, gain +1 Wealth in addition to any other benefits."), curse("Playing Both Sides", "Gain +1 Pantheon Die when the god gets caught playing both sides or arranges a deal where both sides lose.")),
    career("Sales Rep", [25], 4, 2, [
      attachment("individual", "My Boss", 2),
      attachment("group", "My Coworkers", 2)
    ], "Sales reps work for larger companies and turn confidence, people skills, and persistence into a paycheck.", blessing("Remember to Smile!", "Gain +1 Discipline to stay calm during a social confrontation while being verbally attacked."), curse("Know by Rote", "Gain +1 Pantheon Die when the god's social failure comes from treating another person like a customer."))
  ]),
  occupationFamily("Community Services", [26, 27], {
    empathy: 1,
    influence: 1,
    medicine: 1,
    perform: 1,
    stealth: 1
  }, [
    career("Event Organizer", [26], 2, 4, [
      attachment("landmark", "Favorite Venue", 2),
      attachment("group", "My Staff", 2)
    ], "Event organizers coordinate people, venues, and problems while presenting calm in the middle of chaos.", blessing("What You Really Want", "Gain +1 Empathy to cut through bluster and discern the truth behind what someone says."), curse("Chaotic Containment", "Gain +1 Pantheon Die when a situation gets so out of control that the god suffers Overwhelmed 1.")),
    career("Local Foundation", [26], 4, 2, [
      attachment("group", "Volunteers", 2),
      attachment("landmark", "The Foundation", 2)
    ], "Local foundation operators raise money, organize volunteers, advocate for policy, and keep a mission alive.", blessing("We Can Be More", "Gain +1 Influence when trying to inspire others to do good or become better."), curse("Just a Bit Short", "Gain +1 Pantheon Die when the god sacrifices 2 Wealth to support the foundation and keep it going.")),
    career("Social Worker", [27], 2, 2, [
      attachment("group", "Former Clients", 3),
      attachment("individual", "Lawyer Friend", 3)
    ], "Social workers advocate for families, children, and vulnerable people while navigating painful systems.", blessing("Designated Adult", "Gain +2 Discipline when hiding genuine emotions or working through an Overwhelmed Condition."), curse("Heartless System", "Gain +1 Pantheon Die and suffer Confused 1 when someone the god tried to help is hurt due to or despite those efforts."))
  ]),
  occupationFamily("Engineering", [27, 28], {
    crafts: 1,
    knowledge: 1,
    marksman: 1,
    perception: 1,
    travel: 1
  }, [
    career("Architect", [27], 3, 3, [
      attachment("landmark", "My First Structure", 2),
      attachment("group", "The Building Permits Staff", 2)
    ], "Architects balance utility, beauty, and human use when designing spaces and buildings.", blessing("Know the Terrain", "Gain +1 Fighting when taking advantage of a building's construction or layout during a Battle."), curse("Surplus of Rivals", "Gain +1 Pantheon Die when the god cannot leave a job as good enough and loses something important while perfecting it.")),
    career("Civil Engineer", [28], 3, 3, [
      attachment("group", "Construction Crew", 2),
      attachment("individual", "My Surveyor", 2)
    ], "Civil engineers design roads, bridges, utilities, and the flow of cities, often solving problems on-site.", blessing("Designed the Map", "Gain +1 Travel to navigate even unfamiliar cities."), curse("Close Enough", "Gain +1 Pantheon Die when the god acts on reckless assumptions and endangers allies or bystanders.")),
    career("Mechanical Engineer", [28], 3, 3, [
      attachment("landmark", "My Lab", 2),
      attachment("group", "College Buddies", 2)
    ], "Mechanical engineers design tools and machines, applying physics and creativity to practical problems.", blessing("Designed for Use", "Gain +1 Empathy when determining someone's physical capacity or needs."), curse("Self Care Fail", "Gain +1 Pantheon Die and suffer Deprived 1 at the start of a Scene when the god's work harms their health."))
  ]),
  occupationFamily("Freelance", [28, 30], {
    fortitude: 1,
    perform: 1,
    speed: 1,
    survival: 1,
    travel: 1
  }, [
    career("Creator", [28, 29], 4, 2, [
      attachment("group", "Repeat Patrons", 2),
      attachment("landmark", "My Workshop", 2)
    ], "Creators sell the output of a talent, juggling commissions, patrons, deadlines, and online tools.", blessing("Up to Date", "Gain +1 Tech for familiarity with the latest online tools and software."), curse("Inspiration Strikes", "Gain +1 Pantheon Die when an idea hits mid-Scene and the god must act on it immediately or forget it forever. If ignored, lose 1 Wealth.")),
    career("Driver", [29], 3, 2, [
      attachment("individual", "My Mechanic", 3),
      attachment("group", "My Friends", 3)
    ], "Drivers learn their cities and passengers from long hours behind the wheel.", blessing("Unintended Audience", "Gain +1 Perception to eavesdrop casually."), curse("Not Covered by Insurance", "Gain +1 Pantheon Die when car damage forces the god to spend 2 Wealth, or 1 Wealth and 1 Free Time if they help repair it.")),
    career("Online Personality", [30], 4, 2, [
      attachment("group", "My Fans", 2),
      attachment("individual", "Behind-the-Scenes Supporter", 2)
    ], "Online personalities perform, manage equipment and schedules, advertise themselves, and maintain fan communities.", blessing("The Show Must Go On", "Gain +1 Deception when hiding a disease or injury."), curse("Fickle Audiences", "Gain +1 Pantheon Die when the god's reputation tanks and they must Go to Work immediately, gaining no Wealth because the time is spent repairing relationships."))
  ]),
  occupationFamily("Pink Collar", [30, 31], {
    athletics: 1,
    empathy: 1,
    fortitude: 1,
    intuition: 1,
    knowledge: 1
  }, [
    career("Admin", [30], 4, 2, [
      attachment("landmark", "The Office", 2),
      attachment("group", "Fellow Admins", 2)
    ], "Admins keep offices running by managing visitors, schedules, mail, travel, vendors, and everyday problems.", blessing("One Step Ahead", "Gain +1 Intuition to notice issues before they begin, helping avoid arguments, fights, traps, or ambushes."), curse("That Would Look Great on My Desk!", "Gain +1 Pantheon Die when the god cannot resist stealing or overpaying for a trinket.")),
    career("Designer", [30, 31], 3, 3, [
      attachment("individual", "My Supplier", 2),
      attachment("individual", "My Assistant", 2)
    ], "Designers use color, shape, line, texture, scent, and expertise to make things communicate and function.", blessing("Color Theory", "Gain +1 Knowledge when deciphering symbols and hidden messages."), curse("Hideous", "Gain +1 Pantheon Die when the god struggles to pay attention to anything except nearby bad design.")),
    career("Teacher", [31], 2, 2, [
      attachment("group", "The Faculty", 3),
      attachment("landmark", "My School", 3)
    ], "Teachers educate children and teens while weathering criticism, grading, planning, counseling, and spending their own resources.", blessing("Surrounded by Germs", "Gain +2 Fortitude when avoiding illness."), curse("Caught in the Wild", "Gain +1 Pantheon Die when the god is spotted outside school by a student who is surprised or immediately wants to talk."))
  ]),
  occupationFamily("Sciences", [31, 32], {
    athletics: 1,
    knowledge: 1,
    perception: 1,
    survival: 1,
    tech: 1
  }, [
    career("Earth Sciences", [31], 3, 3, [
      attachment("individual", "The Evaluator", 2),
      attachment("group", "My Coworkers", 2)
    ], "Earth scientists study natural forces and formations in the field, from bones and caves to oceans and storms.", blessing("In the Field", "Gain +1 Athletics when traversing natural formations or places."), curse("Preserve the Environment", "Gain +1 Pantheon Die when the god takes extra care in natural environments and loses 1 Free Time at the end of the Scene.")),
    career("Life Sciences", [32], 2, 4, [
      attachment("group", "The Interns", 2),
      attachment("individual", "My Research Partner", 2)
    ], "Life scientists study living things in labs and in the field, often seeking ways to improve life.", blessing("Life Will Out", "Gain +1 Survival when applying a lesson from the god's area of study."), curse("Pierian Spring", "Gain +1 Pantheon Die when the god pontificates incorrectly on a scientific subject outside their expertise and fails from lack of knowledge.")),
    career("Social Sciences", [32], 2, 4, [
      attachment("group", "The Grant Provider", 2),
      attachment("individual", "My Project Manager", 2)
    ], "Social scientists study people, cultures, and social phenomena using stories, numbers, and observation.", blessing("Dinosaurs", "Gain +1 Perception when trying to read a person or situation."), curse("Everyone's an Expert", "Gain +1 Pantheon Die when the god is drawn into an argument with another armchair analyst explaining their field to them."))
  ]),
  occupationFamily("Service Industry", [33, 34], {
    deception: 1,
    influence: 1,
    marksman: 1,
    medicine: 1,
    perform: 1
  }, [
    career("Chef", [33], 3, 3, [
      attachment("individual", "My Sous Chef", 2),
      attachment("landmark", "My Restaurant", 2)
    ], "Chefs manage high-stress kitchens, safety standards, new dishes, and public reputation.", blessing("Kitchen Medic", "Gain +1 Medicine when patching up small injuries."), curse("Quality Costs", "Gain +1 Pantheon Die when the god spends +2 Wealth on the quality of a purchased item.")),
    career("Cosmetologist", [33], 4, 2, [
      attachment("landmark", "My Salon", 2),
      attachment("individual", "Friendly Coworker", 2)
    ], "Cosmetologists cut, clean, and style hair and nails while decoding vague requests and working on their feet.", blessing("Strong Hands", "Gain +1 Might when gripping onto something."), curse("Bad Gossip", "Gain +1 Pantheon Die when the god acts on wrong information to the detriment of themself or allies.")),
    career("Mortician", [34], 3, 3, [
      attachment("individual", "The Medical Examiner", 2),
      attachment("landmark", "The Funeral Parlor", 2)
    ], "Morticians handle funeral arrangements, rites, bodies, and grief with calm efficiency.", blessing("Dressing the Dead", "Gain +1 Deception when applying believable makeup for a disguise."), curse("Discomfort the Living", "Gain +1 Pantheon Die when frank discussion of death alienates others and stops a normal social situation."))
  ]),
  occupationFamily("Technicians", [34, 35], {
    athletics: 1,
    crafts: 1,
    might: 1,
    medicine: 1,
    tech: 1
  }, [
    career("Drafter", [34], 3, 2, [
      attachment("individual", "The Engineer", 3),
      attachment("landmark", "My Home", 3)
    ], "Drafters create detailed technical plans and understand machines, materials, systems, and assembly.", blessing("Reading the Blanks", "Gain +1 Marksman when aiming at a stationary target."), curse("Miss the Forest", "Gain +1 Pantheon Die when the god gets lost in small details and completely misses the big picture.")),
    career("Field Technician", [34, 35], 3, 3, [
      attachment("individual", "The Boss", 2),
      attachment("group", "My Coworkers", 2)
    ], "Field technicians install and maintain technology on-site, often in physically demanding conditions.", blessing("In High Places", "Gain +1 Athletics when climbing."), curse("Takes a Toll", "Once per Session, when the god takes an Ignored Limits Condition, raise its level by +1 and gain +1 Pantheon Die.")),
    career("Lab Tech", [35], 3, 3, [
      attachment("individual", "The Lead Scientist", 2),
      attachment("landmark", "The Lab", 2)
    ], "Lab techs do hands-on laboratory work, document procedures, analyze samples, and maintain equipment.", blessing("Get It Done", "Gain +1 Speed when using technology to find answers on a deadline."), curse("Cross-Contamination", "Gain +1 Pantheon Die when the god frustrates others by demanding unnecessary care to prevent contamination."))
  ]),
  occupationFamily("Trades", [35, 36], {
    crafts: 1,
    fighting: 1,
    might: 1,
    speed: 1,
    stealth: 1
  }, [
    career("Construction", [35], 2, 4, [
      attachment("group", "My Crew", 2),
      attachment("individual", "My Foreman", 2)
    ], "Construction workers build roads and structures through demanding work that often draws public annoyance instead of praise.", blessing("Look Out", "Gain +1 Speed when dodging falling objects."), curse("Off-Season", "At the start of each Session, roll 1d10. On failure, gain +1 Pantheon Die and the character cannot Go to Work this Session. On a Critical Failure, also suffer Hopeless 1.")),
    career("Independent Contractor", [36], 4, 2, [
      attachment("individual", "My Boss", 2),
      attachment("group", "My Union", 2)
    ], "Independent contractors handle repairs and maintenance problems in other people's homes and workplaces.", blessing("Just Ignore Me", "Gain +1 Stealth to cover the god's tracks."), curse("That House", "Gain +1 Pantheon Die when an encounter reminds the god of That House and causes them to freeze in the memory.")),
    career("Mechanic", [36], 3, 3, [
      attachment("landmark", "My Garage", 2),
      attachment("group", "My Crew", 2)
    ], "Mechanics repair cars and other machines, deciphering problems from minimal information.", blessing("Restoration", "Gain +1 Crafts when repairing large machinery."), curse("Dangerous Machinery", "Gain +1 Pantheon Die when the god takes a Physical Condition representing an old injury slowing them down."))
  ])
];

const ARCHETYPES = [
  archetype("The Chaste", [37], "Self-Awareness", {
    discipline: 1,
    empathy: 1,
    knowledge: 1,
    medicine: 1,
    might: 1
  }, [
    attachment("individual", "Individual Bond", 2),
    attachment("worshipper", "Worshipper Entitlement", 2)
  ], "The Chaste relies on self-knowledge, faith, and temperance rather than giving in to every emotion or temptation.", [
    blessing("Faith's Protection", "When targeted by an ability or power, sacrifice 2 Pantheon Dice to raise that power's cost by +1. If it was free, receive +2 to resist its effects. This cannot be used if the Chaste started the Battle."),
    blessing("Steadfast", "Gain +1 Discipline to avoid distractions and +1 Fortitude to resist physical needs such as hunger or sleep."),
    blessing("Veil of Innocence", "Gain +2 Influence to talk out of a questionable act if the Chaste leaves immediately. Staying breaks the assumption of innocence and increases incoming damage from possible opponents by +1.")
  ], [
    curse("Hopeless Optimism", "Gain +1 Pantheon Die when something goes wrong after the character simply hoped for the best."),
    curse("Refusal", "Gain +1 Pantheon Die when the Chaste must say no to temptation or pleasure and the refusal leads to trouble.")
  ]),
  archetype("The Demon", [38], "Manipulation", {
    deception: 1,
    fighting: 1,
    influence: 1,
    perception: 1,
    speed: 1
  }, [
    attachment("vassal", "Vassal Entitlement", 2),
    attachment("worshipper", "Worshipper Entitlement", 2)
  ], "The Demon uses power, pleasure, anger, and manipulation to bend people toward their will.", [
    blessing("Its Own Reward", "When an Attachment returns from a successful Lead Follow-up or Favor, roll 1d10 for the result: 1-2 Strain the Attachment, 3-4 lose 1 Pantheon Die, 5-6 add +1 Pantheon Die, 7-8 heal 1 Strain, 9-10 add +1 Pantheon Die and heal 1 Strain."),
    blessing("Materialism", "Before the Demon makes a check, another player may spend 1 Wealth to grant +2. On a Boost, the Demon may keep the Wealth. The Demon cannot pay this cost themself."),
    blessing("Tempter", "Gain +1 Deception or Influence to convince someone to perform a harmful task or one with only temporary positive effects.")
  ], [
    curse("Demonic Wrath", "Gain +1 Pantheon Die when the Demon cannot hold back anger and erupts into violence, destruction, or chaos."),
    curse("Want to Make a Deal?", "Gain +1 Pantheon Die when the Demon strikes a deal that skews toward the other party, even when it does not really benefit the Demon.")
  ]),
  archetype("The Doomed", [39], "Pessimism", {
    athletics: 1,
    fortitude: 1,
    intuition: 1,
    survival: 1,
    travel: 1
  }, [
    attachment("group", "Group Bond", 2),
    attachment("individual", "Individual Bond", 2)
  ], "The Doomed knows a terrible fate is waiting and lets that certainty shape every choice.", [
    blessing("Death Wish", "Gain +1 to checks where the Doomed takes on danger for someone else, such as taking a hit or completing an apparent suicide mission."),
    blessing("Learn From Mistakes", "When the Doomed would add dice to the Pantheon Pool from a Critical Failure, add +1 additional Pantheon Die."),
    blessing("The Upside", "At the start of a Scene, make a Simple (1) Intuition + Speed check. Extra successes become a personal dice stash for that Scene. Repeat each Scene, increasing Difficulty by +1 until failure, then lose 1 Pantheon Die and activate the worst fitting Curse.")
  ], [
    curse("Hanged Man", "Gain +1 Pantheon Die if the Doomed is captured, trapped, taken hostage, or otherwise placed in a terrible position."),
    curse("Ticking Clock", "At the end of any Scene where the Doomed does not activate a Curse, gain 1 Pantheon Die and lose 1 Free Time.")
  ]),
  archetype("The Judge", [40], "Justice", {
    crafts: 1,
    intuition: 1,
    medicine: 1,
    perception: 1,
    travel: 1
  }, [
    attachment("group", "Group Bond", 2),
    attachment("vassal", "Vassal Entitlement", 2)
  ], "The Judge is driven by right, wrong, law, morality, and the hard choices that follow.", [
    blessing("Into Submission", "After reducing an enemy to 3 or less Health, Psyche, or Threshold, spend 1 Pantheon Die to make a Moderate (2) Fighting + Influence check. Success forces submission, with -1 penalties for animal intelligence, Spark, or the Judge also being at 3 or less Health or Psyche."),
    blessing("On the Scene", "When moving on the Territory Grid, sacrifice 1 Pantheon Die to automatically move 2 squares before calculating Free Time. This affects only the Judge."),
    blessing("Truth Seeker", "Gain +1 to rolls that reveal the truth, such as searching a room, interrogating a culprit, or tracking a witness.")
  ], [
    curse("My Mission", "Gain +1 Pantheon Die when the Judge ignores everything else to complete their mission, regardless of strife, conflict, or damage."),
    curse("Show Mercy", "Gain +1 Pantheon Die if the Judge shows mercy and that choice comes back to hurt them or the group.")
  ]),
  archetype("The Shadow", [41], "Secrets", {
    discipline: 1,
    influence: 1,
    might: 1,
    speed: 1,
    stealth: 1
  }, [
    attachment("individual", "Individual Bond", 2),
    attachment("vassal", "Vassal Entitlement", 2)
  ], "The Shadow understands their own darkness and uses that empathy to survive, defend, and manipulate.", [
    blessing("The Best Defense", "After a successful Defense check, sacrifice Pantheon Dice up to the success margin to deal 1 damage per die sacrificed."),
    blessing("Chaotic Mind", "When the Shadow successfully resists mental aggression, the attacker takes 1 Psyche damage that cannot be negated. On a Boost, the attacker also suffers Overwhelmed 1."),
    blessing("You're Like Me", "Gain +1 Deception or Empathy when dealing with people's dark sides or when people are at their worst.")
  ], [
    curse("Bring Out Your Worst", "Gain +1 Pantheon Die when the Shadow says or does something that brings out someone's dark side with terrible results."),
    curse("Unkind Skeletons", "Gain +1 Pantheon Die if someone discovers something from the Shadow's past that can be used against them, their Bonds, or their pantheon.")
  ]),
  archetype("The Trickster", [42], "Twisted Humor", {
    crafts: 1,
    deception: 1,
    marksman: 1,
    perform: 1,
    tech: 1
  }, [
    attachment("landmark", "Landmark Bond", 2),
    attachment("relic", "Relic Entitlement", 2)
  ], "The Trickster treats life as a game and often turns fun, lies, and pranks into real consequences.", [
    blessing("Choice of Games", "At the start of the Session, choose one Skill and gain +1 with it. Sacrifice 1 Pantheon Die to switch the bonus to another Skill at any time. This Blessing cannot be enhanced with XP."),
    blessing("Mercurial", "Select one unique Blessing from another Archetype."),
    blessing("Unbelievably Believable", "Gain +1 Influence or Perform to tell twisted stories and creative embellishments that use just enough truth to work.")
  ], [
    curse("I Use My Words", "Gain +1 Pantheon Die when the Trickster's lack of physical contribution hurts the group or leaves them in a lurch."),
    curse("What a Fun Game!", "Gain +1 Pantheon Die when the Trickster does something for fun and it causes more trouble than expected.")
  ])
];

const THEOLOGIES = [
  theology("Coatlicue's Step-Children", [56, 57], ["Fence-straddlers", "Peacemakers", "Idealists"], ["Compromised", "Apologists", "Diplomats"], {
    athletics: 1,
    knowledge: 1,
    perception: 1,
    stealth: 1,
    tech: 1
  }, {
    aegis: 2,
    oracle: 1,
    soul: 1
  }, 2, 1, "Miakoda Atreides, Goddess of Conspiracy",
  "Coatlicue's Step-Children seek peace between gods and Outsiders, shelter mortals caught in divine affairs, and create Touched agents to bridge societies that usually meet through suspicion or violence.",
  "Initiates live among Outsiders to learn fosterage, tolerance, vigilance, and the practical risks of strange customs. Their mortal lives often weaken, while Outsider and Worshipper ties grow stronger.",
  "Step-Child stories revolve around diplomacy with inhuman communities, protecting mortals, and convincing a pantheon that peace with Outsiders is worth the suspicion it creates.",
  blessing("Step-Mother's Touch", "For 1 Fragment, approach and speak with a non-hostile Outsider without fear; while the god and companions remain non-aggressive, the Outsider does not attack from compulsion, and the god adds Spark to social checks in that interaction. The god may also spend 2 Fragments to grant a mortal one Truth or one Dominion effect for three days, recharge it for another three days with 1 Fragment, and once per year make it permanent by losing 1 permanent Fragment."),
  curse("Atonement", "Begin play with at least a Level 1 Vassal, though the Theology does not grant it for free. Ignoring the Vassal causes 2 Strain instead of 1. If the god initiates harm against an Outsider, they suffer 1 Health and 1 Psyche damage that cannot be reduced, remove 1 Pantheon Die, and take a cumulative -1 penalty to all checks until they atone; defending themselves, their pantheon, or Attachments is allowed.")),
  theology("Crofters of Destiny", [60, 61], ["Norns", "Crofters", "Tools"], ["Assured", "Arrogant", "Rebellious"], {
    athletics: 1,
    discipline: 1,
    intuition: 1,
    perform: 1,
    tech: 1
  }, {
    journey: 1,
    puppetry: 2,
    ruin: 1
  }, 2, 1, "Tavion Brooks, God of Names",
  "Crofters of Destiny reject cruel old divine orders and try to keep godhood rooted in moral, worldly futures rather than immortal tyranny.",
  "Crofters recruit and mentor in rotating groups, often called Norns, so no god holds power too long. They prize youth, examples, wards, and direct engagement with politics.",
  "Crofter stories ask what divine power should be and whether a god can guide the future without becoming the next oppressive elder power.",
  blessing("Fateful Existence", "During character creation, gain +2 levels to spend on Divine Allies or Vassals. In play, affect one check by counting dice showing 5+ as successes or by removing the chance of Critical Failure so 1s count as successes. The first use in a Scene costs 1 Fragment; each later use in the same Scene costs 2 Pantheon Dice."),
  curse("Fear of Power", "Planning Phase rolls for Bonds take a penalty equal to Spark - 1, increased by +1 for the Session after using Fateful Existence. The Crofter also suffers -1 Influence and Empathy per Spark Level when interacting with a god whose Spark is higher than theirs.")),
  theology("Fenric Shackles", [64, 65], ["Shackles", "Tamers", "Slavers"], ["Confident", "Domineering", "Sadistic"], {
    deception: 1,
    fighting: 1,
    influence: 1,
    knowledge: 1,
    might: 1
  }, {
    minion: 1,
    ruin: 2,
    shaping: 1
  }, 1, 2, "Vialle Kincaid, Goddess of Fencers",
  "The Fenric Shackles descend from gods who learned soul-binding rites and used them to imprison impossible Outsider threats, leaving them with a legacy of control and oppression.",
  "Shackles train to dominate themselves and others, often balancing mortal authority with a dangerous urge to bind stronger Outsiders into service.",
  "Shackle stories center on control, fear, and the moral cost of enslaving Outsiders when survival and power seem to demand it.",
  blessing("Soul Chains", "Gain the Immunity (Fear) Truth and may control enslaved Outsiders whose total Spark does not exceed Spark x2. A starting character may choose one Outsider within this limit. Each enslaved Outsider is a Vassal with level equal to Spark + 1, maximum 5; spend 1 Fragment to force compliance for the Session, with refusal causing 1 Strain. Once per in-game month when the Outsider would demand time, it may try to break free; retain control with Influence + Might against the Outsider's Spark, and allow resistance when a command violates its nature."),
  curse("Unbalanced Power", "Bonds are capped at Level 3; any higher Bond levels from character creation drop to 3 and become extra Attachment points for Step 5. The Shackle also gains a Power 2 Failing and must account for each thrall's needs, because neglect can lead to intervention, escape, death, or another severe consequence.")),
  theology("Gaea's Wardens", [68, 69], ["Gaea's Blood", "Wardens", "Savages"], ["Protective", "Territorial", "Misanthropic"], {
    empathy: 1,
    marksman: 1,
    perform: 1,
    stealth: 1,
    survival: 1
  }, {
    aegis: 1,
    beckon: 2,
    shaping: 1
  }, 2, 1, "Brigida Hill, Goddess of Bears",
  "Gaea's Wardens see the Earth as the Source's body and put the planet above humanity, Outsiders, and divine politics.",
  "Wardens often abandon ordinary lives for activism, wilderness, ritual, or violent protection of the land, while arguing internally over how far their mission should go.",
  "Warden stories focus on protecting the world instead of people, choosing how much modern life must be cut away, and fitting that uncompromising purpose into a pantheon.",
  blessing("Gaea's Blood", "Gain +1 to checks per level of the god's current Bleeding Condition and reduce Bleeding check penalties by 2. The god may also inflict at least Bleeding 2 on a human or god to gain +2 on their next Manifestation check; a Bestial Dominion allows the associated beast to be sacrificed this way. The god cannot use their own blood and a victim's blood on the same check, gains +1 maximum Health, and chooses one free Truth from Aquatic, Beast Form, Beast Tongue, or Divinely Skilled (Survival); the unchosen Truths cost half XP later."),
  curse("Modern Hatred", "Gain a Vengeance 2 Failing tied to hatred of modern harm against the Earth. During character creation, determine Warden points of interest last: roll one die for the outer column, with 1-3 as column 1, 4-5 as column 2, 6-7 as column 9, and 8-10 as column 10, then roll the row normally. If a point of interest ends up beside another player's modern location, it functions one level lower.")),
  theology("Hearthfire Society", [72, 73], ["Web-Spinners", "Architects", "Gardeners"], ["Scheming", "Meticulous", "Observant"], {
    crafts: 1,
    influence: 1,
    intuition: 1,
    medicine: 1,
    perform: 1
  }, {
    oracle: 1,
    puppetry: 1,
    soul: 2
  }, 1, 3, "Sharon Dershowitz, Goddess of Graffiti",
  "The Hearthfire Society cultivates cities as living domains, guiding civilization through influence, committees, planning, and quiet control rather than open rule.",
  "Web-Spinners seek roles that shape territory and civic systems, and they are willing to remove obstacles if they believe the domain's growth requires it.",
  "Architect stories involve maintaining webs of influence, expanding divine territory, and deciding how far to push Bonds and communities in the name of progress.",
  blessing("Community Command", "Costs for items or services are reduced by 2 when the purchase clearly benefits the community the god commands. During character creation, gain +2 levels for Landmark Bonds and place all points of interest anywhere on the Territory Grid instead of rolling. The god may also place one point of interest for each other player if they dislike its random location, and Sense Spark treats the god's Spark as +1 higher while inside their territory."),
  curse("Everything is at Stake", "Whenever an Attachment drops a level and the god would gain a Failing, increase that Failing's level by +1. If a Landmark Bond takes Strain, the god takes the same amount of Psyche damage, which cannot be negated, reduced, or converted to Conditions.")),
  theology("Nanuk's Outlanders", [76, 77], ["Exiled", "Outlanders", "Bears"], ["Understanding", "Bridges", "Mixing with the Wrong Crowd"], {
    discipline: 1,
    empathy: 1,
    fortitude: 1,
    might: 1,
    survival: 1
  }, {
    beckon: 1,
    minion: 1,
    shaping: 2
  }, 3, 0, "Jason Blalock, God of Fear",
  "Nanuk's Outlanders protect Outsiders and divine exiles, building hidden communities where gods and monsters can survive beside each other.",
  "Outlanders live between divine politics and Outsider obligations, acting as diplomats, protectors, and mentors while constantly making room for inhuman neighbors.",
  "Outlander stories bring a pantheon into Outsider society and ask whether peace, hospitality, and swift retaliation can coexist.",
  blessing("Brothers In Arms", "Gain +2 Vassal levels. For 1 Fragment, gain access to one Outsider Payoff effect without ingesting flesh; only one Payoff can be active at a time and this works only with Outsiders. When attacked by an Outsider, spend 1 Fragment to avoid the attack without a check, impose a cumulative -2 penalty on that Outsider's next attack against the god, and become unable to attack that Outsider as the aura of peace takes hold."),
  curse("Monster Magnet", "Suffer -2 Stealth against Outsiders. In Step 5, gain a Level 3 Outsider Community Group Bond that does not count against Bond limits and has Shared Lessons and Lead Followup but not Resources; Wealth cannot avoid interaction with it. Each Strain to this Bond costs 1 Free Time, and each lost level permanently reduces maximum Free Time by 1 in addition to normal consequences. If maximum Free Time reaches 0, remove another Attachment and restore Free Time equal to its former level. After recording this Bond, receive 3 normal Attachment points.")),
  theology("New Imperium", [80, 81], ["Lords", "Legends", "Imperials"], ["Conquerors", "Connected", "Can't Think For Themselves"], {
    deception: 1,
    discipline: 1,
    marksman: 1,
    speed: 1,
    travel: 1
  }, {
    journey: 2,
    puppetry: 1,
    ruin: 1
  }, 0, 3, "Andrej Antonov, God of Mist",
  "The New Imperium builds an empire of gods who want legends, kingdoms, and enlightened divine order to survive the Descending Storm.",
  "Imperials are vetted, trained, organized, and supported as noble agents of a growing empire, with networks that spread through mortal and divine institutions.",
  "Imperial stories revolve around expansion, command, tactical brilliance, and the question of what kind of kingdom the god wants to rule.",
  blessing("Legion", "During character creation, the GM randomly rolls three Territory Grid points of interest that represent New Imperium expansion. Each is a Level 1 Attachment of the player's choice: Worshipper, Landmark Bond, or Individual Bond. In Battle, spend 1 Fragment and make a Moderate (2) Intuition + Perception check; each success can either add +1 die to a personal Battle pool or be spent to alter the battlefield with routes, obstacles, barriers, or similar advantages."),
  curse("Assumed Nobility", "When beaten, one-upped, or tricked by another god, take Embarrassed 1. If the failure is against non-gods such as mortals or Outsiders, the Condition is Embarrassed 2. These Conditions do not begin to fade until the Lord proves themself better or deals with the one who slighted them.")),
  theology("Prayer Tenders", [84, 85], ["Cultivators", "Genies", "Legendaries"], ["Rabble-Rousers", "Territorial", "Delusional"], {
    empathy: 1,
    fighting: 1,
    medicine: 1,
    perception: 1,
    travel: 1
  }, {
    aegis: 1,
    minion: 2,
    soul: 1
  }, 1, 2, "Joseph Cheung, God of Wolves",
  "Prayer Tenders cultivate worship and answer mortal need, turning legends, cults, rescues, and promises into living congregations.",
  "Cultivators build symbiotic or controlling relationships with worshippers, protect their congregations jealously, and risk losing ordinary life to reverence.",
  "Prayer Tender stories explore what followers want from their god, what the god wants to become, and how worship can help or divide a pantheon.",
  blessing("Craving Adulation", "During character creation, receive a Level 1 Chosen One Worshipper that does not reduce permanent Fragments, a Level 1 Preacher Worshipper, and +4 additional Worshipper levels. Gain +1 to all Planning and Execution Phase checks with Worshippers. Devoting a Scene to Worshippers heals 2 Strain, and Split Attention heals 1 Strain on a 5-10."),
  curse("We Summon Thee", "When Worshippers need attention and the god is out of Free Time, they may summon and teleport the god to their Territory Grid point or to a random inconvenient location chosen by the GM. The god may spend 1 Fragment and make a Moderate (2) Discipline + Intuition check to resist; success treats it as Ignoring the Worshippers and imposes -1 to all checks until the god tends their prayers, while failure teleports them. All non-Worshipper Attachments act as if they are 1 level lower.")),
  theology("Reliquarians", [88, 89], ["Bookworms", "Relic Hunters", "Joneses"], ["Learned", "Cerebral", "Absent-Minded"], {
    crafts: 1,
    fortitude: 1,
    knowledge: 1,
    speed: 1,
    tech: 1
  }, {
    beckon: 1,
    journey: 1,
    oracle: 2
  }, 1, 2, "Eli White, God of Learning",
  "Reliquarians preserve the hidden craft of relic-making, hunt lost divine objects, and guard vaults of dangerous or useful artifacts.",
  "Relic hunters chase leads through archives, markets, museums, libraries, and travel networks, often dropping social obligations when the next artifact appears.",
  "Reliquarian stories involve obsession, discovery, creation, and the danger of becoming valuable enough for other gods to capture or exploit.",
  blessing("A Relic for Everything", "Sense relics, including Soulbound Relics, similarly to Sense Spark. During character creation, gain +2 Relic levels, ignore Attunement checks for Level 1 and 2 Relics, and gain +2 on other Attunement checks. The god may create a Relic by imbuing it with 1 Fragment, permanently lowering available Fragments by 1 per creation; the created Relic cannot exceed the god's Spark unless the GM allows an exception. To duplicate an existing Relic, find and destroy one, then make a Tough (3) Knowledge + Crafts check; success memorizes the blueprint for future creations, while failure destroys the Relic without learning it."),
  curse("Hoarding", "The god receives only 3 points instead of 5 for Attachments during character creation and gains a Hoarder 2 Failing that affects every aspect of life. Their obsession covers relics and mundane collected scraps alike."))
];

export const CHARACTER_OPTION_ITEMS = [
  ...OCCUPATION_FAMILIES.flatMap((family) => family.careers.map((entry) => makeOccupationCareer({
    family,
    career: entry,
    contentVersion: CHAPTER_TWO_CONTENT_VERSION
  }))),
  ...ARCHETYPES.map((entry) => makeArchetype({
    archetype: entry,
    contentVersion: CHAPTER_TWO_CONTENT_VERSION
  })),
  ...THEOLOGIES.map((entry) => makeTheology({
    theology: entry,
    contentVersion: THEOLOGY_CONTENT_VERSION
  }))
];

function occupationFamily(name, pdfPages, skills, careers) {
  return {
    name,
    pdfPages,
    skills,
    careers
  };
}

function career(name, pdfPages, freeTime, wealth, attachments, description, blessing, curse) {
  return {
    name,
    pdfPages,
    freeTime,
    wealth,
    attachments,
    description,
    blessing,
    curse
  };
}

function archetype(name, pdfPages, definingTrait, skills, attachments, description, blessings, curses) {
  return {
    name,
    pdfPages,
    definingTrait,
    skills,
    attachments,
    description,
    blessings,
    curses
  };
}

function theology(name, pdfPages, aliases, stereotypes, skills, manifestations, freeTime, wealth, associatedSampleGod, history, lifestyle, playStyle, blessing, curse) {
  return {
    name,
    pdfPages,
    aliases,
    stereotypes,
    skills,
    manifestations,
    freeTime,
    wealth,
    associatedSampleGod,
    history,
    lifestyle,
    playStyle,
    blessing,
    curse
  };
}

function blessing(name, effect) {
  return { name, effect };
}

function curse(name, effect) {
  return { name, effect };
}
