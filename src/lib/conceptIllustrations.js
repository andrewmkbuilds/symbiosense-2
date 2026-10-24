// Concept illustrations used across the SYMBIOTIX site.
// Every image here is AI-generated concept artwork — not a photograph of the team,
// our robot, or any real field site. Real photos replace these as the season goes on.
// The files ship with the site itself, in public/images.

const LICHEN = "/images/illustration-lichen.png";
const INVASIVE = "/images/illustration-invasive.png";
const ROVER = "/images/illustration-rover.png";
const SENSOR = "/images/illustration-sensor.png";
const DASHBOARD = "/images/illustration-dashboard.png";
const FIELD_NOTES = "/images/illustration-field-notes.png";
const CANOPY = "/images/illustration-canopy.png";
const CHASSIS = "/images/illustration-chassis.png";
const ATTACHMENT = "/images/illustration-attachment.png";
const TEST_BENCH = "/images/illustration-test-bench.png";
const PRACTICE_MAT = "/images/illustration-practice-mat.png";
const PRESENTATION = "/images/illustration-presentation.png";

export const GALLERY_ILLUSTRATIONS = [
  { url: LICHEN, title: "Surveying lichen indicators on bark", categories: ["Project Research", "Prototypes"] },
  { url: INVASIVE, title: "Flagging a possible invasive plant for human review", categories: ["Project Research", "Prototypes"] },
  { url: ROVER, title: "Field rover capturing survey images", categories: ["Prototypes", "Robot Building"] },
  { url: SENSOR, title: "Sensor node collecting site measurements", categories: ["Prototypes", "Robot Building"] },
  { url: DASHBOARD, title: "Turning observations into one BioRisk view", categories: ["Prototypes", "Competition"] },
  { url: FIELD_NOTES, title: "Recording observations together in the field", categories: ["Team Photos", "Project Research"] },
  { url: CANOPY, title: "The woodland layers we monitor", categories: ["Team Photos", "Project Research"] },
  { url: CHASSIS, title: "Robot chassis concept", categories: ["Robot Building"] },
  { url: ATTACHMENT, title: "Attachment mechanism concept", categories: ["Robot Building"] },
  { url: TEST_BENCH, title: "Sensors, code and the testing bench", categories: ["Robot Building", "Prototypes"] },
  { url: PRACTICE_MAT, title: "Mission practice table", categories: ["Competition", "Prototypes"] },
  { url: PRESENTATION, title: "Presenting our project to the judges", categories: ["Competition", "Certificates"] },
];

export const illustrationsFor = (category) =>
  GALLERY_ILLUSTRATIONS.filter((item) => item.categories.includes(category));

export const BUILD_ILLUSTRATIONS = [
  { url: CHASSIS, caption: "Chassis and drive base concept" },
  { url: ATTACHMENT, caption: "Attachment mechanism concept" },
  { url: TEST_BENCH, caption: "Sensors, code and testing bench" },
  { url: PRACTICE_MAT, caption: "Mission practice table" },
];

export const JOURNEY_CONCEPT_PHOTOS = [
  { id: 1, url: LICHEN, caption: "Concept illustration — how lichen indicators are surveyed", location: "", date: "" },
  { id: 2, url: INVASIVE, caption: "Concept illustration — flagging a possible invasive plant", location: "", date: "" },
  { id: 3, url: ROVER, caption: "Concept illustration — a field rover capturing survey images", location: "", date: "" },
  { id: 4, url: SENSOR, caption: "Concept illustration — sensor node collecting measurements", location: "", date: "" },
  { id: 5, url: FIELD_NOTES, caption: "Concept illustration — recording observations together", location: "", date: "" },
  { id: 6, url: CANOPY, caption: "Concept illustration — the woodland layers we monitor", location: "", date: "" },
];

export const MEMBER_AVATARS = [
  "/images/avatar-1.png",
  "/images/avatar-2.png",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
];

export const avatarFor = (index) => MEMBER_AVATARS[index % MEMBER_AVATARS.length];