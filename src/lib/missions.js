// ─────────────────────────────────────────────────────────────
// BIOGLOW™ Founders Edition — 15 missions.
// Source: official Robot Game Rulebook (pp. 5, 8–12), modified by
// Challenge Updates dated Sept 2, 2026 (Update 01).
//
// Condition types:
//   boolean  – scores `points` when checked
//   bonus    – like boolean, always depends on another condition (`requires`)
//   count    – `points` each, up to `max` (optional `cap` = another count id)
//   tier     – only ONE level scores: `tierPoints[level]`
//   flag     – no points itself; a rule/condition other items depend on
//   select   – picks a value used by a mission-level rule
// `noEquipment` = the rulebook shows the "No Equipment Constraint" symbol.
// ─────────────────────────────────────────────────────────────

export const MISSIONS = [
  {
    number: 1,
    name: "Drone Survey",
    bags: "1, 2",
    noEquipment: true,
    objective: "High above the canopy, drones survey the landscape and transmit data back in real time. Help the pilot launch the drone to create a LiDAR map of this rainforest ecosystem.",
    conditions: [
      { id: "m1_drone", label: "Drone is no longer touching the mat", type: "boolean", points: 20 },
      { id: "m1_bonus", label: "Bonus: and the LiDAR map is completely flipped over, with the scan marker at least partly in the survey area", type: "bonus", points: 10, requires: "m1_drone" },
    ],
  },
  {
    number: 2,
    name: "Exploding Seeds",
    bags: "3",
    objective: "Some trees use a unique strategy to disperse their seeds. Release the seeds from the seed pod, propelling them to new ground.",
    conditions: [
      { id: "m2_seeds", label: "Seeds no longer touching the stalk", type: "count", max: 3, points: 10 },
    ],
  },
  {
    number: 3,
    name: "Flip the Rock",
    bags: "4, 5",
    objective: "Many creatures thrive just below the surface. Flip the rock to discover what's living underneath but leave no trace by placing it back the way you found it.",
    conditions: [
      { id: "m3_flag", label: "The research flag is down", type: "boolean", points: 20 },
      { id: "m3_bonus", label: "Bonus: and the rock has been returned to its original starting position", type: "bonus", points: 10, requires: "m3_flag" },
    ],
  },
  {
    number: 4,
    name: "Lucky Leaves",
    bags: "6",
    noEquipment: true,
    zeroIf: "m4_out_end",
    objective: "Hidden in plain sight, the katydid camouflages with its leafy surroundings. Collect as many leaves as you can without disturbing this master of disguise.",
    conditions: [
      { id: "m4_leaf1", label: "One leaf is completely removed, no longer touching the nest", type: "boolean", points: 10 },
      { id: "m4_bonus", label: "Bonus: and the second leaf is completely removed, no longer touching the nest, with the katydid in its original starting position", type: "bonus", points: 20, requires: "m4_leaf1", voidIf: "m4_out_any" },
      { id: "m4_out_any", label: "Rule: the katydid was completely outside the leaf habitat at ANY time during the match (the bonus is no longer available)", type: "flag", points: 0 },
      { id: "m4_out_end", label: "Rule: the katydid is completely outside the leaf habitat at the END of the match (the team scores zero points for this mission)", type: "flag", points: 0, requires: "m4_out_any", implies: "m4_out_any" },
    ],
    update: "Update 01 (Sept 2, 2026) replaces the Rulebook wording: the nest holds the leaves and the katydid; the leaf habitat is the nest plus the marked area on the mat around it. Completely outside the habitat at any time → bonus gone. Completely outside at the end → zero points for this mission. Leaves are randomized before the match and teams are not told where the katydid starts.",
  },
  {
    number: 5,
    name: "Reaching Roots",
    bags: "7",
    noEquipment: true,
    objective: "Rainforest plants stretch their roots far and wide, reaching resources and forming connections with nearby organisms. Help this plant cross the forest boundary in search of symbiosis.",
    conditions: [
      { id: "m5_root", label: "The plant root is… (only one scoring condition is possible)", type: "tier", options: ["Not extended", "Partially extended", "Completely extended"], tierPoints: [0, 10, 20] },
    ],
  },
  {
    number: 6,
    name: "Leafcutter Frenzy",
    bags: "8, 9, 10",
    objective: "Leafcutter ants work together to feed an underground fungus garden. Guide the ants back to their nest – but move too quickly, and you may scatter the leaves they collected.",
    conditions: [
      { id: "m6_ant", label: "The ant is touching the nest (required before leaf fragments can score)", type: "flag", points: 0 },
      { id: "m6_fragments", label: "Leaf fragments contained within the nest", type: "count", max: 4, points: 10, requires: "m6_ant", note: "Maximum of 4 is taken from the model picture (four leaf fragments); the rulebook text does not state a number." },
    ],
  },
  {
    number: 7,
    name: "Humongous Fungus",
    bags: "10",
    noEquipment: true,
    objective: "Mycelium is the vast, underground network of fungus beneath the rainforest floor. Form a new connection between the mycelium and a neighboring tree root.",
    conditions: [
      { id: "m7_mycelium", label: "The mycelium is completely extended", type: "boolean", points: 20 },
      { id: "m7_bonus", label: "Bonus: a connection between one team's extended mycelium and the opposing team's fully extended plant root (two bonuses possible)", type: "count", max: 2, points: 10, requires: "m7_mycelium", note: "Mycelium and plant root do not need to touch. If each is fully extended, both teams earn the bonus. Not possible in remote competitions or when there is no opposing team." },
    ],
  },
  {
    number: 8,
    name: "Tangled",
    bags: "11, 12, 13, 14, 15",
    objective: "Climbing vines have wrapped tightly around this tree. Gently untangle them so the tree has space and sunlight to grow again.",
    conditions: [
      { id: "m8_vine", label: "The vine is touching the mat", type: "boolean", points: 30 },
    ],
    update: "Unverified – not in the Sept 2 Challenge Updates document we checked: a reported Update 03 about taping the tree model. See the Challenge Updates section.",
  },
  {
    number: 9,
    name: "Research Platform",
    bags: "11, 12, 13, 14, 15",
    noEquipment: true,
    objective: "Olivia and Michael are studying species that live in the rainforest canopy with the help of their forest guide. Help the team deploy equipment to monitor activity high above the forest floor.",
    conditions: [
      { id: "m9_platform", label: "The research platform is raised", type: "boolean", points: 10 },
      { id: "m9_camera", label: "The camera trap is deployed", type: "boolean", points: 10 },
      { id: "m9_seed", label: "The seed is no longer touching the tree", type: "boolean", points: 10 },
    ],
  },
  {
    number: 10,
    name: "Fragile Microhabitats",
    bags: "16",
    noEquipment: true,
    objective: "Researchers must work carefully when exploring protected ecosystems. Move through the area without damaging these tiny creatures' homes.",
    conditions: [
      { id: "m10_spider", label: "The spider habitat is in its original starting position", type: "boolean", points: 10 },
      { id: "m10_snail", label: "The snail habitat is in its original starting position", type: "boolean", points: 10 },
    ],
  },
  {
    number: 11,
    name: "Window to the Past",
    bags: "17",
    objective: "Roots help to tell the long history of the rainforest. Open the root window and document what you see.",
    conditions: [
      { id: "m11_cover", label: "The root cover is down, touching the mat", type: "boolean", points: 20 },
    ],
  },
  {
    number: 12,
    name: "Forest Elder",
    bags: "18",
    noEquipment: true,
    objective: "Once a towering giant, this aging tree now bends beneath its own weight. Add a support to stabilize the tree for years to come.",
    conditions: [
      { id: "m12_cane", label: "The cane is completely raised, touching the tree", type: "boolean", points: 20 },
      { id: "m12_tie", label: "The support tie is around the post", type: "boolean", points: 10 },
    ],
  },
  {
    number: 13,
    name: "Keystone Species",
    bags: "19, 20",
    interchangeable: true,
    objective: "Keystone species bring balance to their ecosystem and shape the forest around them. Your team must build and deliver a keystone species to this newly protected habitat. Bag 20 bricks may be used to build it; it counts as equipment and is identified at the pre-match inspection.",
    conditions: [
      { id: "m13_keystone", label: "Your team's keystone species is on the restoration platform, and the young trees are raised", type: "boolean", points: 30 },
    ],
  },
  {
    number: 14,
    name: "Seeds of Renewal",
    bags: "21",
    interchangeable: true,
    objective: "A thriving rainforest relies on its plant diversity. Place the seeds your team has collected in the soil and watch as they take root.",
    conditions: [
      { id: "m14_seeds", label: "Seeds contained within the replantation station", type: "count", max: 4, points: 5, note: "Maximum of 4 is taken from the pieces shown in the rulebook picture; the rulebook text does not state a number." },
      { id: "m14_bonus", label: "Bonus: of those seeds, how many are also touching the mat", type: "count", max: 4, points: 5, requires: "m14_seeds", cap: "m14_seeds" },
    ],
  },
  {
    number: 15,
    name: "Biocentric Architecture",
    bags: "22, 23, 24",
    noEquipment: true,
    interchangeable: true,
    envBonus: { select: "m15_dock", points: 10, map: { Mine: "m15_canopy", City: "m15_skylight", Farm: "m15_compost" } },
    objective: "Thoughtful design creates harmony between humans and the natural world. Modify the building to create homes for wildlife, restore soil health, and bring natural light to green spaces.",
    conditions: [
      { id: "m15_canopy", label: "The nesting canopy is raised", type: "boolean", points: 10 },
      { id: "m15_skylight", label: "The garden skylight is completely in", type: "boolean", points: 10 },
      { id: "m15_compost", label: "The compost hatch is completely opened, touching the mat", type: "boolean", points: 10 },
      { id: "m15_dock", label: "Environmental Bonus (+10, only one possible): which dock is the model on? Mine → nesting canopy · City → garden skylight · Farm → compost hatch", type: "select", options: ["Mine", "City", "Farm"] },
    ],
  },
];