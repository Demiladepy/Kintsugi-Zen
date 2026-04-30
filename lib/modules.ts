export type ModuleItem = {
  id: string;
  title: string;
  subject: "Computer Science" | "Mathematics" | "Biology" | "History" | "Languages";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  length: number;
  format: "Text" | "Video" | "Interactive";
  author: string;
  reads: number;
  adaptations: number;
  appreciations: number;
  readyForUser?: boolean;
};

export const mockModules: ModuleItem[] = [
  {
    id: "compilers-intro",
    title: "A Structured Introduction to Compiler Pipelines",
    subject: "Computer Science",
    difficulty: "Beginner",
    length: 22,
    format: "Text",
    author: "8f2a...e31b",
    reads: 2810,
    adaptations: 924,
    appreciations: 611,
    readyForUser: true,
  },
  {
    id: "linear-algebra-vision",
    title: "Linear Algebra for Computer Vision Systems",
    subject: "Mathematics",
    difficulty: "Intermediate",
    length: 36,
    format: "Interactive",
    author: "4cd9...aa12",
    reads: 1932,
    adaptations: 511,
    appreciations: 344,
  },
  {
    id: "cell-membranes",
    title: "Cell Membranes, Transport, and Information Exchange",
    subject: "Biology",
    difficulty: "Beginner",
    length: 18,
    format: "Text",
    author: "9a14...89ff",
    reads: 1571,
    adaptations: 420,
    appreciations: 276,
    readyForUser: true,
  },
  {
    id: "ancient-trade",
    title: "Trade Networks in the Classical Mediterranean",
    subject: "History",
    difficulty: "Advanced",
    length: 41,
    format: "Video",
    author: "17bc...e90d",
    reads: 882,
    adaptations: 201,
    appreciations: 109,
  },
  {
    id: "syntax-acquisition",
    title: "Second-Language Syntax Acquisition and Transfer",
    subject: "Languages",
    difficulty: "Intermediate",
    length: 27,
    format: "Text",
    author: "f88e...22b1",
    reads: 1265,
    adaptations: 307,
    appreciations: 180,
  },
  {
    id: "distributed-systems",
    title: "Failure Models in Distributed Systems",
    subject: "Computer Science",
    difficulty: "Advanced",
    length: 46,
    format: "Text",
    author: "0be1...c902",
    reads: 2043,
    adaptations: 588,
    appreciations: 390,
    readyForUser: true,
  },
];
