// ─────────────────────────────────────────────────────────────
// BIOGLOW™ 2026–2027 Founders Edition — Challenge
// Audited against the uploaded official Robot Game Rulebook, Team Meeting
// Guide, Engineering Notebook and Challenge Updates (Sept 2, 2026).
// Rubric row wording and links are from official pages but could not be
// re-read in the uploaded files — see the "unverified" notes on each page.
// ─────────────────────────────────────────────────────────────

export const LAST_CHECKED = "Audited against official documents (Challenge Updates dated Sept 2, 2026)";

export const SEASON_INFO = {
  name: "BIOGLOW™",
  season: "2026–2027",
  umbrella: "FIRST® CANOPY™",
  edition: "Founders Edition",
  program: "Challenge",
  technology: "LEGO® Education SPIKE™ Prime (other listed LEGO® Education sets are also allowed)",
  matchDuration: "2.5 minutes",
  matchFormat: "Three official matches; only the best score counts toward awards and advancement",
  teamSize: "Teams of up to 10 children",
};

export const CORE_VALUES = [
  { name: "Teamwork", desc: "We are stronger when we work together." },
  { name: "Inclusion", desc: "We respect each other and embrace our differences." },
  { name: "Impact", desc: "We apply what we learn to improve our world." },
  { name: "Fun", desc: "We enjoy and celebrate what we do!" },
  { name: "Discovery", desc: "We explore new skills and ideas." },
  { name: "Innovation", desc: "We use creativity and persistence to solve problems." },
];

export const FOUR_PARTS = [
  { name: "Core Values", desc: "Evaluated in all parts of a team's work by judges and referees. Each of the four parts accounts for 25% of a team's total performance at an event." },
  { name: "Innovation Project", desc: "Identify a problem that puts biodiversity at risk and design an innovative solution that can help, then share it in a live five-minute presentation." },
  { name: "Robot Design", desc: "Judges assess the team's process of building and coding the robot; the team gets five minutes to explain its design, programs and strategy." },
  { name: "Robot Game", desc: "Three official 2.5-minute matches; the robot completes as many of the 15 missions as it can autonomously." },
];

export const PRECISION_TOKENS = {
  starting: 6,
  points: { 0: 0, 1: 10, 2: 15, 3: 25, 4: 35, 5: 50, 6: 50 },
  rule: "You begin the match with six precision tokens worth 50 total points. If you interrupt the robot outside of home, the referee will remove one token. You earn points for the number of tokens remaining at the end of the match.",
};

export const EQUIPMENT_RULES = {
  inspection: "Before the match there is an equipment inspection. All equipment must fit within the two launch areas and under a height limit of 12 in. (305 mm). If your robot and all equipment fit completely in just one launch area under that height limit, the team earns 20 points.",
  noEquipmentConstraint: "When the 'No Equipment Constraint' symbol appears in a mission, the rule is: 'A mission model cannot earn points if it is touching equipment at the end of the match.' This applies only to the specific mission in which the constraint appears.",
};

export { MISSIONS } from "@/lib/missions";

// Only Update 01 is contained in the Challenge Updates document we audited (dated Sept 2, 2026).
// Updates 02 and 03 appear in earlier website content but are NOT in that document, so they
// are marked as requiring verification and are not treated as confirmed rules.
export const CHALLENGE_UPDATES = [
  {
    id: "update-01",
    date: "September 2, 2026",
    verified: true,
    title: "Update 01 — Lucky Leaves (Mission 4)",
    body: "Before the match begins, the leaves will be randomized within the nest, and teams will not be told the starting placement of the katydid. This is an intentional part of the challenge. The mission constraints are replaced with: the nest is the mission model that holds the leaves and the katydid; the leaf habitat includes the nest and the marked area on the mat that surrounds it; if the katydid is completely outside the leaf habitat at any time during the match, the bonus is no longer available; if the katydid is completely outside the leaf habitat at the end of the match, the team scores zero points for this mission. Scoring materials will be updated, so download the latest versions.",
    affects: ["Mission 4", "Scoring", "Practice Score Tracker updated"],
  },
  {
    id: "update-02",
    date: "Date not confirmed",
    verified: false,
    title: "Reported Update 02 — Releasing interchangeable models from docks (Missions 13–15)",
    body: "Earlier site content said that programming the robot to remove an interchangeable model from its dock using the model's built-in latch is allowed when done autonomously. This is NOT in the Sept 2, 2026 document we audited, so treat it as unconfirmed until you read it in the latest official Challenge Updates.",
    affects: ["Missions 13–15"],
  },
  {
    id: "update-03",
    date: "Date not confirmed",
    verified: false,
    title: "Reported Update 03 — Tree stabilization (Missions 8 & 9)",
    body: "Earlier site content said events are encouraged to tape the tree model behind the tree. This is NOT in the Sept 2, 2026 document we audited, so treat it as unconfirmed. The Rulebook itself says tournament setups may differ from practice setups, including table construction and surface smoothness (p. 7).",
    affects: ["Missions 8 & 9", "Field setup"],
  },
];

export const JUDGING_FLOW = [
  { step: "Team welcome", detail: "Introductory conversation while the team sets up materials", time: "2 minutes" },
  { step: "Innovation Project — team presentation", detail: "Live presentation of the project", time: "5 minutes" },
  { step: "Innovation Project — question & answer", detail: "Judges ask questions", time: "5 minutes" },
  { step: "Robot Design — team explanation", detail: "Robot design, programs and strategy (without the game field)", time: "5 minutes" },
  { step: "Robot Design — question & answer", detail: "Judges ask questions", time: "5 minutes" },
  { step: "Final share & feedback", detail: "Optional final thoughts; judges may ask clarifying questions and give verbal feedback", time: "Up to 8 minutes" },
];

export const ROBOT_GAME_RULES = [
  { group: "Equipment (Rules 1–7)", items: [
    "All equipment must be LEGO® building pieces in original factory condition (LEGO string and pneumatic tubes may be cut to length).",
    "Any number of non-electric LEGO pieces from any set may be used.",
    "Electric equipment: a maximum of one controller, a maximum of four motors (any mix), and only touch/force, color, distance/ultrasonic and gyro sensors (any mix and number).",
    "LEGO wires, one controller power pack or six AA batteries, and one microSD card are allowed in any one match.",
    "Any software or programming language may be used. The robot must be autonomous outside of home; no remote controllers of any type.",
    "One sheet of notebook paper per home area for program notes is allowed and does not count as equipment.",
    "Additional or duplicate mission models are not allowed.",
  ]},
  { group: "Before the match (Rules 8–11)", items: [
    "Pre-match inspection: all equipment must fit within the two launch areas and under 12 in. (305 mm). Fitting everything in just one launch area under the limit earns 20 points.",
    "No extra storage space: equipment stays on the table or in the technicians' hands. The areas left and right of the mat may store equipment.",
    "Teams get a couple of minutes to set up, calibrate sensors using any part of the mat, and ask the referee to check the field.",
    "Technicians split into two groups, one per side, and cannot switch sides. Teams of four or more: two technicians per home area; three: two on one side and one on the other; two: one per side.",
  ]},
  { group: "Inside home (Rules 12–14)", items: [
    "Technicians may handle the robot, equipment and mission models only when completely within their own home area.",
    "Technicians may not hand anything between home areas, touch anything outside their home area (except to interrupt the robot), or cause anything to move outside it (except launching). Points scored this way do not count.",
    "When launching, technicians may not keep anything from moving, and the robot and anything it is about to move must fit completely inside the launch area.",
  ]},
  { group: "Outside home (Rules 15–20)", items: [
    "If technicians interrupt the robot it must be relaunched. If the robot or anything in contact with it was outside home (even partly), the team loses one precision token.",
    "Teams may not interrupt the robot in a way that earns points from it.",
    "Equipment or models dropped outside home stay where they rest unless the robot moves them; if partly inside home they may be removed by hand (a removed mission model goes to the referee; removed equipment returns to home and costs one precision token).",
    "Teams may not separate the Dual Lock, take models apart, or break a mission model. Points scored this way do not count.",
    "A mission model combined with anything (including the robot) must be loose enough for a technician to free it in perfect original condition in a single motion.",
    "Teams may not interact with the opposing team's field, robot, equipment or shared mission interactions unless a mission allows it.",
  ]},
  { group: "After the match (Rules 21–25)", items: [
    "After 2.5 minutes the match ends; technicians stop the robot and touch nothing else. Scoring begins.",
    "All mission requirements must be visibly met at the end of the match unless a method was required. Lines and airspace above an area count as 'in' that area.",
    "Gracious Professionalism is scored at every match: Accomplished (3) by default, Exceeds (4) or Developing (2). It is added to the Core Values score from judging.",
    "The referee records results with the team; if there is no agreement the head referee decides. Only the best of the three official matches counts. Ties are broken by second and third best scores.",
  ]},
];

export const ROBOT_DESIGN_RUBRIC = {
  categories: [
    {
      name: "Identify",
      desc: "Team determined which missions to attempt, explored building and coding resources, and sought guidance as needed.",
      rows: [
        { criterion: "Evidence of mission strategy", levels: ["Minimal evidence of mission strategy", "Partial evidence of mission strategy", "Clear evidence of mission strategy"] },
        { criterion: "Use of building or coding resources", levels: ["Minimal use of building or coding resources", "Some use of building or coding resources", "Clear use of building or coding resources to support their mission strategy"] },
      ],
    },
    {
      name: "Design",
      desc: "Team members worked collaboratively on their designs and developed the building and coding skills needed.",
      rows: [
        { criterion: "All team members contributed ideas", levels: ["Minimal evidence that all team members contributed ideas", "Partial evidence that all team members contributed ideas", "Clear evidence that all team members contributed ideas"] },
        { criterion: "Building and coding skills in all team members", levels: ["Minimal evidence of building and coding skills in all team members", "Partial evidence of building and coding skills in all team members", "Clear evidence of building and coding skills in all team members"] },
      ],
    },
    {
      name: "Create",
      desc: "Team developed original designs or improved on existing ones according to their mission strategy.",
      rows: [
        { criterion: "Explanation of attachments and their purpose", levels: ["Unclear explanation of attachments and their purpose", "Simple explanation of attachments and their purpose", "Clear explanation of innovative attachments and their purpose"] },
        { criterion: "Explanation of code and/or sensor use", levels: ["Unclear explanation of code and/or sensor use", "Simple explanation of code and/or sensor use", "Clear explanation of innovative code and/or sensor use"] },
      ],
    },
    {
      name: "Iterate",
      desc: "Team repeatedly tested their robot and code to identify areas for improvement and incorporated the findings into their solutions.",
      rows: [
        { criterion: "Evidence of testing their robot and code", levels: ["Minimal evidence of testing their robot and code", "Partial evidence of testing their robot and code", "Clear evidence of repeated testing of their robot and code"] },
        { criterion: "Improvements based on testing", levels: ["Minimal evidence of improvements based on testing", "Partial evidence of improvements based on testing", "Clear evidence of improvements based on testing"] },
      ],
    },
    {
      name: "Communicate",
      desc: "Team effectively explained what they learned from the robot design process and celebrated their progress.",
      rows: [
        { criterion: "Explanation of process and lessons learned", levels: ["Unclear explanation of process and lessons learned", "Simple explanation of process and lessons learned", "Detailed explanation of process and lessons learned"] },
        { criterion: "Pride or enthusiasm for their work", levels: ["Team shows minimal pride or enthusiasm for their work", "Team shows partial pride or enthusiasm for their work", "Team clearly shows pride or enthusiasm for their work"] },
      ],
    },
  ],
  levels: ["Beginning (1)", "Developing (2)", "Accomplished (3)", "Exceeds (4)"],
};

export const INNOVATION_PROJECT_RUBRIC = {
  categories: [
    {
      name: "Identify",
      desc: "Team had a clearly defined problem that was well researched.",
      rows: [
        { criterion: "Definition of the problem", levels: ["Unclear definition of the problem", "Partially clear definition of the problem", "Clear definition of the problem"] },
        { criterion: "Evidence of research", levels: ["Minimal evidence of research", "Partial evidence of research from one or more sources", "Clear, detailed research from a variety of sources"] },
      ],
    },
    {
      name: "Design",
      desc: "Team worked together while creating a project plan and developing their ideas.",
      rows: [
        { criterion: "Evidence of an effective project plan", levels: ["Minimal evidence of an effective project plan", "Partial evidence of an effective project plan", "Clear evidence of an effective project plan"] },
        { criterion: "Development process involved all team members", levels: ["Minimal evidence that development process involved all team members", "Partial evidence that development process involved all team members", "Clear evidence that development process involved all team members"] },
      ],
    },
    {
      name: "Create",
      desc: "Team developed an original idea or built on an existing one with a prototype model/drawing to represent their solution.",
      rows: [
        { criterion: "Explanation of innovation in solution", levels: ["Minimal explanation of innovation in solution", "Simple explanation of innovation in solution", "Detailed explanation of innovation in solution"] },
        { criterion: "Model/drawing that represents the solution", levels: ["Unclear model/drawing that represents the solution", "Simple model/drawing that represents the solution", "Detailed model/drawing that represents the solution"] },
      ],
    },
    {
      name: "Iterate",
      desc: "Team shared their ideas with others, collected feedback, and included improvements to their solution.",
      rows: [
        { criterion: "Sharing of their solution with others", levels: ["Minimal sharing of their solution with others", "Solution shared with at least one person/group", "Solution shared with multiple people/groups"] },
        { criterion: "Improvements based on feedback", levels: ["Minimal evidence of improvements based on feedback", "Partial evidence of improvements based on feedback", "Clear evidence of improvements based on feedback"] },
      ],
    },
    {
      name: "Communicate",
      desc: "Team shared an effective presentation of their solution, its impact on others, and celebrated their team's progress.",
      rows: [
        { criterion: "Explanation of solution and its potential impact", levels: ["Unclear explanation of the solution and its potential impact on others", "Partially clear explanation of solution and its potential impact on others", "Clear explanation of solution and its potential impact on others"] },
        { criterion: "Pride or enthusiasm for their work", levels: ["Presentation shows minimal pride or enthusiasm for their work", "Presentation shows partial pride or enthusiasm for their work", "Presentation clearly shows pride or enthusiasm for their work"] },
      ],
    },
  ],
  levels: ["Beginning (1)", "Developing (2)", "Accomplished (3)", "Exceeds (4)"],
};

export const OFFICIAL_LINKS = {
  fllGlobal: "https://www.firstlegoleague.org/",
  fllUae: "https://www.flluae.org/",
  fllUaeResources: "https://www.flluae.org/resources",
  fllDach: "https://www.first-lego-league.org/en/",
  fllDachRobotGame: "https://www.first-lego-league.org/en/2026-27-season/challenge-resources/robot-game",
  firstinspiresGetStarted: "https://www.firstinspires.org/programs/fll/get-started",
  firstinspiresGameSeason: "https://www.firstinspires.org/programs/fll/game-and-season",
  firstinspiresSeasonMaterials: "https://www.firstinspires.org/resources/library/fll/season-materials",
  firstCanopy: "https://www.firstinspires.org/first-canopy",
  // UAE-specific documents (from flluae.org/resources)
  uaeChallengeOverview: "https://www.flluae.org/assets/downloads/5.%20fll-challenge-bioglow-season-overview.pdf",
  uaeTmg: "https://www.flluae.org/assets/downloads/7.%20fll-challenge-bioglow-tmg%20(1).pdf",
  uaeEngineeringNotebook: "https://www.flluae.org/assets/downloads/6.%20fll-challenge-bioglow-en%20(1).pdf",
  uaeRulebook: "https://www.flluae.org/assets/downloads/8.%20fll-challenge-bioglow-rgr%20(1).pdf",
  uaeBuildingInstructions: "https://www.flluae.org/assets/downloads/3.%20Building%20instructions.zip",
  uaeFieldSetupGuide: "https://www.flluae.org/assets/downloads/1.%20fll-challenge-bioglow-field-setup-reference-guide.pdf",
  uaeTableInstructions: "https://www.flluae.org/assets/downloads/4.%20fll-challenge-bioglow-table-building-instructions.pdf",
  uaeScoresheet: "https://www.flluae.org/assets/downloads/2.%20fll-challenge-bioglow-software-scoresheet.pdf",
  uaeJudgingRubric: "https://www.flluae.org/assets/downloads/11.%20fll-challenge-bioglow-rubrics-color%20(1).pdf",
  uaeJudgingFlowchart: "https://www.flluae.org/assets/downloads/12.%20fll-challenge-bioglow-judging-session-flowchart%20(1).pdf",
  uaeSessionSlides: "https://www.flluae.org/assets/downloads/13.%20Session-Slides.zip",
  uaeGuidedMissionCode: "https://www.flluae.org/assets/downloads/10.%20guided-mission-bioglow-11.zip",
  // FIRST Inspires (global) documents
  fiTmg: "https://firstinspires.blob.core.windows.net/fll/challenge/2026-27/fll-challenge-bioglow-tmg.pdf",
  fiEngineeringNotebook: "https://firstinspires.blob.core.windows.net/fll/challenge/2026-27/fll-challenge-bioglow-en.pdf",
  fiRulebook: "https://firstinspires.blob.core.windows.net/fll/challenge/2026-27/fll-challenge-bioglow-rgr.pdf",
  fiRulebookInteractive: "https://firstinspires.blob.core.windows.net/fll/challenge/2026-27/interactive-rgr/index.html",
  fiUpdates: "https://firstinspires.blob.core.windows.net/fll/challenge/2026-27/fll-challenge-bioglow-updates.pdf",
  // Videos
  videoMissions: "https://www.youtube.com/watch?v=uhZZ8O1StiQ",
  videoFieldSetupUae: "https://www.youtube.com/watch?v=wDan0826cn0",
  videoMissionScoringUae: "https://www.youtube.com/watch?v=Ec6hpsqxa5I",
  // Registration
  uaeRegistration: "https://forms.cloud.microsoft/r/Y6L3q0HVCE",
  uaeKitShop: "https://atlabshoponline.com/",
};

export const RESOURCES = [
  { category: "Robot Game", title: "Robot Game Rulebook", source: "FLL UAE / FIRST® Inspires", url: "https://www.flluae.org/assets/downloads/8.%20fll-challenge-bioglow-rgr%20(1).pdf", available: true },
  { category: "Robot Game", title: "Robot Game Rulebook (Interactive)", source: "FIRST® Inspires", url: "https://firstinspires.blob.core.windows.net/fll/challenge/2026-27/interactive-rgr/index.html", available: true },
  { category: "Robot Game", title: "Robot Game Software Scoresheet", source: "FLL UAE", url: "https://www.flluae.org/assets/downloads/2.%20fll-challenge-bioglow-software-scoresheet.pdf", available: true },
  { category: "Robot Game", title: "Challenge Updates (latest version — check for newer updates)", source: "FIRST® Inspires", url: "https://firstinspires.blob.core.windows.net/fll/challenge/2026-27/fll-challenge-bioglow-updates.pdf", available: true },
  { category: "Audited copies", title: "Robot Game Rulebook — copy used for our audit", source: "FIRST® LEGO® League (uploaded by team)", url: "/resources/fll-bioglow-robot-game-rulebook.pdf", available: true },
  { category: "Audited copies", title: "Team Meeting Guide — copy used for our audit", source: "FIRST® LEGO® League (uploaded by team)", url: "/resources/fll-bioglow-team-meeting-guide.pdf", available: true },
  { category: "Audited copies", title: "Engineering Notebook — copy used for our audit", source: "FIRST® LEGO® League (uploaded by team)", url: "/resources/fll-bioglow-engineering-notebook.pdf", available: true },
  { category: "Audited copies", title: "Challenge Updates dated Sept 2, 2026 — copy used for our audit", source: "FIRST® LEGO® League (uploaded by team)", url: "/resources/fll-bioglow-challenge-updates.pdf", available: true },
  { category: "Robot Game", title: "Robot Game Updates — Q&A log", source: "FLL UAE", url: "", available: false, note: "Coming soon" },
  { category: "Robot Game", title: "Mission Model Building Instructions", source: "FLL UAE", url: "https://www.flluae.org/assets/downloads/3.%20Building%20instructions.zip", available: true },
  { category: "Robot Game", title: "Field Setup Reference Guide", source: "FLL UAE", url: "https://www.flluae.org/assets/downloads/1.%20fll-challenge-bioglow-field-setup-reference-guide.pdf", available: true },
  { category: "Robot Game", title: "Robot Game Table Building Instructions", source: "FLL UAE", url: "https://www.flluae.org/assets/downloads/4.%20fll-challenge-bioglow-table-building-instructions.pdf", available: true },
  { category: "Robot Game", title: "Code for Guided Mission", source: "FLL UAE", url: "https://www.flluae.org/assets/downloads/10.%20guided-mission-bioglow-11.zip", available: true },
  { category: "Robot Game", title: "Robot Game Missions Video (Founders Edition)", source: "FIRST® Inspires / YouTube", url: "https://www.youtube.com/watch?v=uhZZ8O1StiQ", available: true },
  { category: "Robot Game", title: "Field Setup Video (Challenge)", source: "FLL UAE / YouTube", url: "https://www.youtube.com/watch?v=wDan0826cn0", available: true },
  { category: "Robot Game", title: "Mission Models & Scoring Video (Challenge)", source: "FLL UAE / YouTube", url: "https://www.youtube.com/watch?v=Ec6hpsqxa5I", available: true },
  { category: "Judging", title: "Challenge Judging Rubric", source: "FLL UAE", url: "https://www.flluae.org/assets/downloads/11.%20fll-challenge-bioglow-rubrics-color%20(1).pdf", available: true },
  { category: "Judging", title: "Challenge Judging Session Flowchart", source: "FLL UAE", url: "https://www.flluae.org/assets/downloads/12.%20fll-challenge-bioglow-judging-session-flowchart%20(1).pdf", available: true },
  { category: "Judging", title: "Engineering Notebook", source: "FLL UAE / FIRST® Inspires", url: "https://www.flluae.org/assets/downloads/6.%20fll-challenge-bioglow-en%20(1).pdf", available: true },
  { category: "Judging", title: "Team Meeting Guide", source: "FLL UAE / FIRST® Inspires", url: "https://www.flluae.org/assets/downloads/7.%20fll-challenge-bioglow-tmg%20(1).pdf", available: true },
  { category: "Judging", title: "Challenge Session Support Slides", source: "FLL UAE", url: "https://www.flluae.org/assets/downloads/13.%20Session-Slides.zip", available: true },
  { category: "Season", title: "Challenge Overview", source: "FLL UAE", url: "https://www.flluae.org/assets/downloads/5.%20fll-challenge-bioglow-season-overview.pdf", available: true },
  { category: "Season", title: "FIRST® CANOPY™ — Season Page", source: "FIRST® Inspires", url: "https://www.firstinspires.org/first-canopy", available: true },
  { category: "Season", title: "BIOGLOW™ Season Page (D-A-CH)", source: "HANDS on TECHNOLOGY", url: "https://www.first-lego-league.org/en/2026-27-season", available: true },
  { category: "Registration", title: "UAE Challenge Team Registration", source: "FLL UAE", url: "https://forms.cloud.microsoft/r/Y6L3q0HVCE", available: true },
  { category: "Registration", title: "Buy the Season Kit (ATLAB)", source: "ATLAB Shop", url: "https://atlabshoponline.com/", available: true },
  { category: "Registration", title: "FIRST® Dashboard (Register)", source: "FIRST® Inspires", url: "https://my.firstinspires.org/Dashboard/", available: true },
  { category: "General", title: "FIRST® LEGO® League — Global Site", source: "FIRST® / LEGO® Education", url: "https://www.firstlegoleague.org/", available: true },
  { category: "General", title: "FLL UAE — Official UAE Programme", source: "ATLAB / FLL UAE", url: "https://www.flluae.org/", available: true },
  { category: "General", title: "FLL Season Materials (FIRST® Inspires)", source: "FIRST® Inspires", url: "https://www.firstinspires.org/resources/library/fll/season-materials", available: true },
  { category: "General", title: "Get Started with FLL", source: "FIRST® Inspires", url: "https://www.firstinspires.org/programs/fll/get-started", available: true },
];