import {
  attachmentOption as attachment,
  makeArchetype,
  makeOccupationCareer
} from "./foundry-builders.mjs";

const CONTENT_VERSION = "2026-06-27.chapter-two-character-options.2";

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

export const CHARACTER_OPTION_ITEMS = [
  ...OCCUPATION_FAMILIES.flatMap((family) => family.careers.map((entry) => makeOccupationCareer({
    family,
    career: entry,
    contentVersion: CONTENT_VERSION
  }))),
  ...ARCHETYPES.map((entry) => makeArchetype({
    archetype: entry,
    contentVersion: CONTENT_VERSION
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

function blessing(name, effect) {
  return { name, effect };
}

function curse(name, effect) {
  return { name, effect };
}
