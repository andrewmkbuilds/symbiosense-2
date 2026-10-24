// The SYMBIOTIX season journey, as told on the Journey page.
//
// This is plain site content: edit the entries below to update the timeline.
// `done: true` marks a milestone the team has completed, which drives the
// season progress figure at the top of the page.
export const SEASON_MILESTONES = [
  {
    id: 1,
    icon: "Users",
    title: "Team Formation",
    date: "Aug 2026",
    desc: "Our team came together and registered for the BIOGLOW™ 2026–2027 season under FIRST® CANOPY™. We assigned roles and met our mentor Pahini.",
    done: true,
  },
  {
    id: 2,
    icon: "Leaf",
    title: "Season Kickoff & Theme Study",
    date: "Aug 2026",
    desc: "We studied the BIOGLOW™ challenge, explored biodiversity themes, and read the official Robot Game Rulebook and scoresheet.",
    done: true,
  },
  {
    id: 3,
    icon: "FlaskConical",
    title: "Research & Brainstorming",
    date: "Sep 2026",
    desc: "We researched environmental challenges in biodiversity and brainstormed innovation project ideas, focusing on ecosystem monitoring.",
    done: false,
  },
  {
    id: 4,
    icon: "FlaskConical",
    title: "Innovation Project: SYMBIOSENSE",
    date: "Sep–Oct 2026",
    desc: "We developed SYMBIOSENSE — our concept for combining biological indicators (lichens) with AI-assisted invasive plant detection to help conservation teams prioritise field investigations.",
    done: false,
  },
  {
    id: 5,
    icon: "Bot",
    title: "Robot Building & Coding",
    date: "Oct 2026",
    desc: "We designed, built, and coded our SPIKE™ Prime robot for the 15 BIOGLOW™ missions. Veer leads coding; Arnav, Ryan, and Dhruv lead building.",
    done: false,
  },
  {
    id: 6,
    icon: "Cpu",
    title: "Testing & Iteration",
    date: "Oct–Nov 2026",
    desc: "We tested our robot on the practice mat, iterated on attachments and code, and tracked our scores with the mission tracker.",
    done: false,
  },
  {
    id: 7,
    icon: "Wrench",
    title: "Presentation Preparation",
    date: "Nov 2026",
    desc: "We prepared our innovation project presentation, robot design pitch, and practised demonstrating Core Values. Pranav leads communication.",
    done: false,
  },
  {
    id: 8,
    icon: "Calendar",
    title: "Competition Day",
    date: "Nov 2026 – Apr 2027",
    desc: "We present our project, run three official matches, and celebrate the season with other teams at the FLL UAE event.",
    done: false,
  },
];

export const seasonProgress = (milestones) => {
  const done = milestones.filter((m) => m.done).length;
  return {
    doneCount: done,
    total: milestones.length,
    progress: milestones.length > 0 ? Math.round((done / milestones.length) * 100) : 0,
    nextUp: milestones.find((m) => !m.done)?.title?.split(" ")[0] || null,
  };
};