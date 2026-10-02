// All editable portfolio content lives here.

export const profile = {
  firstName: "HASIB",
  lastName: "NIRJHAR",
  fullName: "Hasibul Islam Nirjhar",
  katakana: "ニルジャル",
  roles: ["Engineer", "Researcher", "AI Builder", "Designer"],
  location: "Dhaka, Bangladesh",
  timeZone: "Asia/Dhaka",
  email: "hasibnirjhar100@gmail.com",
  resume: "/resume.pdf",
};

export const socials = [
  { label: "GitHub", short: "GH", href: "https://github.com/HasibNirjhar07" },
  {
    label: "LinkedIn",
    short: "IN",
    href: "https://www.linkedin.com/in/hasibul-islam-nirjhar-b50925262/",
  },
  { label: "Email", short: "@", href: `mailto:${profile.email}` },
];

export const about = {
  text:
    "I'm a full stack engineer and AI researcher from Dhaka, studying Software Engineering at IUT. " +
    "I build scalable web apps, obsess over interfaces that feel alive, and research machine learning, from EEG diagnostics to agents that write their own code.",
  stats: [
    { value: "3.60", label: "CGPA at IUT" },
    { value: "ACM", label: "Published, MLMI 2026" },
    { value: "20+", label: "Projects shipped" },

  ],
};

// Looping anime clips for the "What I do" cards, hotlinked from GIPHY (attribution shown in the section).
const giphy = (id: string) => ({
  gif: `https://media.giphy.com/media/${id}/giphy.gif`,
  page: `https://giphy.com/gifs/${id}`,
});

export const services = [
  {
    index: "01",
    title: "DEVELOP",
    jp: "開発",
    blurb:
      "End-to-end products: typed frontends, resilient APIs and data models that scale past the demo.",
    tags: ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "Firebase", "REST"],
    clip: { ...giphy("mC7M5n4RR3iN2qBoYi"), label: "EP.01 · SHIPPING CODE" },
  },
  {
    index: "02",
    title: "DESIGN",
    jp: "設計",
    blurb:
      "Interfaces with motion and intent: design systems, micro-interactions and real-time 3D on the web.",
    tags: ["UI/UX", "Tailwind", "GSAP", "Three.js", "Framer Motion", "Figma"],
    clip: { ...giphy("14ykqngG4rUYpi"), label: "EP.02 · SKETCHING UI" },
  },
  {
    index: "03",
    title: "INTELLIGENCE",
    jp: "知能",
    blurb:
      "Applied machine learning: from notebooks to features users touch, with models that earn their place.",
    tags: ["Python", "TensorFlow", "ML Models", "Data Pipelines", "LLM Apps"],
    clip: { ...giphy("JYZWs0UkzK2WKBoCUM"), label: "EP.03 · MODEL ONLINE" },
  },
];

export const journey = [
  {
    tag: "NOW",
    title: "B.Sc. Software Engineering",
    place: "Islamic University of Technology",
    text: "Studying systems, algorithms and software design while holding a 3.60 CGPA.",
  },
  {
    tag: "PUBLISH",
    title: "First-author paper, ACM MLMI 2026",
    place: "Tokyo, Japan · with Victoria University & IRCCS",
    text: "An EEG-based machine learning framework for diagnosing ADHD and specific learning disorder.",
  },
  {
    tag: "BUILD",
    title: "Full Stack Projects",
    place: "HobbyHub · Lingua Kids · Shahajjo",
    text: "Shipped social, ed-tech and real-time civic apps across web and mobile.",
  },
  {
    tag: "WIN",
    title: "Hackathons & Open Source",
    place: "Top contributor recognition, 2024",
    text: "Competed, collaborated and contributed back to the tools I use every day.",
  },
  {
    tag: "NEXT",
    title: "AI-native Products",
    place: "Exploring AGI · building for the next billion",
    text: "Combining full stack craft with machine learning to build what comes next.",
  },
];

export const projects = [
  {
    title: "HobbyHub",
    category: "Social Platform",
    year: "Full Stack",
    description:
      "A social platform for hobbyists to share passions, post, comment, follow and explore. Dual authentication, media uploads and admin reporting.",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop",
    tags: ["Node.js", "Express", "MongoDB", "Passport.js"],
    github: "https://github.com/HasibNirjhar07/HobbyHub",
    accent: "#22d3ee",
  },
  {
    title: "Lingua Kids",
    category: "Ed-Tech",
    year: "Web App",
    description:
      "Helps children improve English through reading, writing, listening and speaking exercises, with streaks, leaderboards and playful animated UI.",
    image: "https://cdn.vectorstock.com/i/500p/01/82/children-studying-in-classroom-vector-6320182.jpg",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    github: "https://github.com/HasibNirjhar07/lingua-kids",
    accent: "#a78bfa",
  },
  {
    title: "Shahajjo",
    category: "Real-time Help",
    year: "Mobile",
    description:
      "Connects people in need with nearby volunteers. Live tracking, location-based requests and a backend built to scale.",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1600&auto=format&fit=crop",
    tags: ["React Native", "Firebase", "Google Maps API"],
    github: "https://github.com/hasin023/shahajjo",
    accent: "#34d399",
  },
];

const devicon = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

export type TechCategory = "frontend" | "backend" | "ai" | "languages" | "tools";

export const techCategories: { id: TechCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "ai", label: "AI · ML" },
  { id: "languages", label: "Languages" },
  { id: "tools", label: "Tools" },
];

/** `mono` marks single-colour black logos that need inverting on dark backgrounds. */
export const techStack: {
  name: string;
  icon: string;
  color: string;
  tags: TechCategory[];
  mono?: boolean;
}[] = [
  { name: "React", icon: devicon("react/react-original.svg"), color: "#61dafb", tags: ["frontend"] },
  { name: "Next.js", icon: devicon("nextjs/nextjs-original.svg"), color: "#9b87f5", tags: ["frontend", "backend"], mono: true },
  { name: "TypeScript", icon: devicon("typescript/typescript-original.svg"), color: "#3178c6", tags: ["languages", "frontend"] },
  { name: "JavaScript", icon: devicon("javascript/javascript-original.svg"), color: "#f7df1e", tags: ["languages", "frontend"] },
  { name: "Node.js", icon: devicon("nodejs/nodejs-original.svg"), color: "#5fa04e", tags: ["backend"] },
  { name: "Express", icon: devicon("express/express-original.svg"), color: "#a3a3b5", tags: ["backend"], mono: true },
  { name: "MongoDB", icon: devicon("mongodb/mongodb-original.svg"), color: "#47a248", tags: ["backend"] },
  { name: "Firebase", icon: devicon("firebase/firebase-original.svg"), color: "#ffca28", tags: ["backend", "tools"] },
  { name: "Tailwind", icon: devicon("tailwindcss/tailwindcss-original.svg"), color: "#38bdf8", tags: ["frontend"] },
  { name: "Python", icon: devicon("python/python-original.svg"), color: "#4b8bbe", tags: ["languages", "ai"] },
  { name: "TensorFlow", icon: devicon("tensorflow/tensorflow-original.svg"), color: "#ff6f00", tags: ["ai"] },
  { name: "Three.js", icon: devicon("threejs/threejs-original.svg"), color: "#38e1ff", tags: ["frontend"], mono: true },
  { name: "Java", icon: devicon("java/java-original.svg"), color: "#f89820", tags: ["languages"] },
  { name: "C++", icon: devicon("cplusplus/cplusplus-original.svg"), color: "#659ad2", tags: ["languages"] },
  { name: "C#", icon: devicon("csharp/csharp-original.svg"), color: "#9b4f96", tags: ["languages"] },
  { name: "Git", icon: devicon("git/git-original.svg"), color: "#f05032", tags: ["tools"] },
];

export const research = {
  featured: {
    venue: "ACM · MLMI 2026",
    where: "9th Int'l Conference on Machine Learning and Machine Intelligence · Tokyo, Japan",
    title: "A Novel EEG-Based Machine Learning Framework for Diagnosing ADHD, Specific Learning Disorder, and Typical Development",
    authors: [
      "Hasibul Islam Nirjhar",
      "Ashik Mostafa Alvi",
      "Maria Cristina De Cola",
      "Francesca Cucinotta",
      "Nunzio Muscara",
      "Hua Wang",
    ],
    me: "Hasibul Islam Nirjhar",
    summary:
      "A multiclass framework that reads raw EEG and separates children with ADHD, specific learning disorder and typical development, with careful preprocessing, bandpower and wavelet features, and robust cross-validation across 184 participants.",
    metrics: [
      { value: 80.98, suffix: "%", label: "Accuracy", decimals: 2 },
      { value: 90.45, suffix: "%", label: "Macro specificity", decimals: 2 },
      { value: 0.97, suffix: "", label: "F1 on typical development", decimals: 2 },
      { value: 184, suffix: "", label: "Participants", decimals: 0 },
    ],
    keywords: ["EEG", "ADHD", "SLD", "SVM", "Signal Processing", "Healthcare ML"],
    doi: "https://doi.org/10.1145/3841358.3841418",
    html: "https://camps.aptaracorp.com/ACM_PMS/PMS/ACM/MLMI2026/60/68bc764a-9bd7-11f1-949e-16ffef0ebbf1/OUT/mlmi2026-60.html",
  },
  ongoing: {
    status: "In progress",
    title: "Agentic AI for Code Generation",
    summary:
      "LLM agents that plan, write, execute and repair code in a loop, studying how tool use, tests and self-review make generated code actually correct.",
    tags: ["LLM Agents", "Code Generation", "Tool Use", "Self-repair", "Evaluation"],
  },
  interests: ["Agentic AI", "LLM code generation", "ML for healthcare", "EEG signal processing"],
};

export const studio = {
  heading: ["Teaching AI", "agents to write", "their own code."],
  log: [
    { cmd: '$ agent run --task "fix failing tests"', tone: "cmd" },
    { cmd: "› planning…            3 steps", tone: "dim" },
    { cmd: "› reading repo         128 files", tone: "dim" },
    { cmd: "› writing patch        src/api/users.ts", tone: "info" },
    { cmd: "› running tests        ✔ 42 passed", tone: "ok" },
    { cmd: "› self-review          ✔ ready to ship", tone: "ok" },
  ],
};
