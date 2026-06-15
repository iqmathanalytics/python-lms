import type { Module, CourseId } from "@/lib/types";
import { agenticAiModules } from "./agentic-ai-curriculum";

export const PLATFORM_NAME = "Introduction to Python";
export const PLATFORM_LOGO = "/logo/nexperts-logo.png";
export const PLATFORM_TAGLINE =
  "Structured Python lessons with visuals and hands-on practice — built for future Data Science.";

const pythonModules: Module[] = [
  {
    id: 1,
    name: "Python Introduction and Setting up the Environment",
    slug: "introduction-and-setup",
    course: "python",
    description:
      "What is programming, why Python, and how to set up your development environment.",
    icon: "🐣",
    phase: "foundations",
    topics: [
      {
        id: "m1-t1",
        title: "Introduction to Programming",
        slug: "introduction-to-programming",
        description: "What programming is and how it works.",
        estimatedMinutes: 8,
        published: true,
        videoUrl: "ECenYderNYI",
      },
      {
        id: "m1-t2",
        title: "Choosing Python",
        slug: "choosing-python",
        description: "Why Python fits learning programming and data science.",
        estimatedMinutes: 6,
        published: true,
        videoUrl: "-aya4j7RL8k",
      },
      {
        id: "m1-t3",
        title: "Setting up Python Environment",
        slug: "setting-up-python",
        description: "Install Python step by step on your computer.",
        estimatedMinutes: 12,
        published: true,
        videoUrl: "DWMNJi6BV1U",
      },
      {
        id: "m1-t4",
        title: "Python IDEs",
        slug: "python-ides",
        description: "Tools to write code — including this site's built-in IDE.",
        estimatedMinutes: 8,
        published: true,
        videoUrl: "lE4fD4P-oNU",
      },
    ],
  },
  {
    id: 2,
    name: "Python Basic Syntax and Data Types",
    slug: "basic-syntax-and-data-types",
    description: "Your first lines of Python: print, variables, and data types.",
    icon: "✏️",
    course: "python",
    phase: "foundations",
    topics: [
      { id: "m2-t1", title: "Input and Output", slug: "input-output", description: "print() and input().", estimatedMinutes: 10, published: true, videoUrl: "LQ4KVY0wYB4" },
      { id: "m2-t2", title: "Comments", slug: "comments", description: "Notes in your code.", estimatedMinutes: 5, published: true, videoUrl: "gvSLwdE4mT0" },
      { id: "m2-t3", title: "Variables", slug: "variables", description: "Named boxes for data.", estimatedMinutes: 10, published: true, videoUrl: "ow9JrEQ2ky0" },
      { id: "m2-t4", title: "Data Types", slug: "data-types", description: "int, float, str, bool.", estimatedMinutes: 12, published: true, videoUrl: "7G9rn8nKVS4" },
      { id: "m2-t5", title: "Typecasting", slug: "typecasting", description: "Changing one type to another.", estimatedMinutes: 8, published: true, videoUrl: "1vujw9mIsFk" },
    ],
  },
  {
    id: 3,
    name: "Operators in Python",
    slug: "operators",
    description: "Math and logic symbols Python understands.",
    icon: "➕",
    course: "python",
    phase: "foundations",
    topics: [
      { id: "m3-t1", title: "Arithmetic Operators", slug: "arithmetic", description: "+, -, *, /, and more.", estimatedMinutes: 10, published: true, videoUrl: "hNrv_VfBQy0" },
      { id: "m3-t2", title: "Assignment Operators", slug: "assignment", description: "=, +=, and friends.", estimatedMinutes: 8, published: true, videoUrl: "YWkaIHPjZOU" },
      { id: "m3-t3", title: "Comparison Operators", slug: "comparison", description: "==, !=, <, >.", estimatedMinutes: 8, published: true, videoUrl: "-TQCHyshRkA" },
      { id: "m3-t4", title: "Logical Operators", slug: "logical", description: "and, or, not.", estimatedMinutes: 8, published: true, videoUrl: "4DxBPOyx2yA" },
      { id: "m3-t5", title: "Identity Operators", slug: "identity", description: "is, is not.", estimatedMinutes: 6, published: true, videoUrl: "SnewA61Z1eM" },
      { id: "m3-t6", title: "Membership Operators", slug: "membership", description: "in, not in.", estimatedMinutes: 6, published: true, videoUrl: "Wsrk3cEHBzI" },
      { id: "m3-t7", title: "Bitwise Operators", slug: "bitwise", description: "Low-level bit operations.", estimatedMinutes: 10, published: true, videoUrl: "oFyjk7oWWgE" },
    ],
  },
  {
    id: 4,
    name: "Strings in Python",
    slug: "strings",
    description: "Text data: create, slice, and format strings.",
    icon: "🔤",
    course: "python",
    phase: "foundations",
    topics: [
      { id: "m4-t1", title: "Creating Strings", slug: "creating-strings", description: "Quotes and multiline text.", estimatedMinutes: 8, published: true, videoUrl: "cGA3M5vGfh4" },
      { id: "m4-t2", title: "Formatting Strings", slug: "formatting", description: "f-strings and .format().", estimatedMinutes: 10, published: true, videoUrl: "Z81fhULiW6k" },
      { id: "m4-t3", title: "Indexing Strings", slug: "indexing", description: "Access single characters.", estimatedMinutes: 8, published: true, videoUrl: "-hce-Zwkf1Y" },
      { id: "m4-t4", title: "Slicing Strings", slug: "slicing", description: "Cut pieces of text.", estimatedMinutes: 10, published: true, videoUrl: "dTBRt-XOGyE" },
      { id: "m4-t5", title: "String Methods", slug: "methods", description: "upper(), split(), and more.", estimatedMinutes: 12, published: true, videoUrl: "paECLGMcYTI" },
    ],
  },
  {
    id: 5,
    name: "Lists in Python",
    slug: "lists",
    description: "Ordered, changeable collections.",
    icon: "📋",
    course: "python",
    phase: "foundations",
    topics: [
      { id: "m5-t1", title: "Creating Lists", slug: "creating-lists", description: "Square brackets [].", estimatedMinutes: 8, published: true, videoUrl: "s7yYUi1V-Is" },
      { id: "m5-t2", title: "List Properties", slug: "properties", description: "Ordered, mutable, allow duplicates.", estimatedMinutes: 8, published: true, videoUrl: "RRORk60gz1Q" },
      { id: "m5-t3", title: "Indexing Lists", slug: "indexing", description: "Position starts at 0.", estimatedMinutes: 8, published: true },
      { id: "m5-t4", title: "Slicing Lists", slug: "slicing", description: "Sub-lists.", estimatedMinutes: 10, published: true },
      { id: "m5-t5", title: "List Methods", slug: "methods", description: "append(), pop(), etc.", estimatedMinutes: 12, published: true },
      { id: "m5-t6", title: "Modifying Lists", slug: "modifying", description: "Change items in place.", estimatedMinutes: 10, published: true },
    ],
  },
  {
    id: 6,
    name: "Tuples in Python",
    slug: "tuples",
    description: "Ordered, unchangeable collections.",
    icon: "📦",
    course: "python",
    phase: "foundations",
    topics: [
      { id: "m6-t1", title: "Tuple Syntax", slug: "syntax", description: "Parentheses ().", estimatedMinutes: 8, published: true },
      { id: "m6-t2", title: "Tuple Properties", slug: "properties", description: "Immutable and ordered.", estimatedMinutes: 8, published: true },
      { id: "m6-t3", title: "Indexing Tuples", slug: "indexing", description: "Same as lists.", estimatedMinutes: 6, published: true },
      { id: "m6-t4", title: "Slicing Tuples", slug: "slicing", description: "Get parts of a tuple.", estimatedMinutes: 8, published: true },
      { id: "m6-t5", title: "Tuple Methods", slug: "methods", description: "count(), index().", estimatedMinutes: 8, published: true },
    ],
  },
  {
    id: 7,
    name: "Sets in Python",
    slug: "sets",
    description: "Unique unordered collections.",
    icon: "🎯",
    course: "python",
    phase: "foundations",
    topics: [
      { id: "m7-t1", title: "Set Syntax", slug: "syntax", description: "Curly braces or set().", estimatedMinutes: 8, published: true },
      { id: "m7-t2", title: "Updating Sets", slug: "updating", description: "add() and remove().", estimatedMinutes: 8, published: true },
      { id: "m7-t3", title: "Set Operations", slug: "operations", description: "union, intersection.", estimatedMinutes: 10, published: true },
      { id: "m7-t4", title: "Set Methods", slug: "methods", description: "Built-in helpers.", estimatedMinutes: 8, published: true },
    ],
  },
  {
    id: 8,
    name: "Dictionaries in Python",
    slug: "dictionaries",
    description: "Key-value pairs — like a real dictionary.",
    icon: "📖",
    course: "python",
    phase: "foundations",
    topics: [
      { id: "m8-t1", title: "Dictionary Syntax", slug: "syntax", description: "{key: value}.", estimatedMinutes: 8, published: true },
      { id: "m8-t2", title: "Keys and Values", slug: "keys-values", description: "What they mean.", estimatedMinutes: 8, published: true },
      { id: "m8-t3", title: "Accessing Dictionaries", slug: "accessing", description: "[] and .get().", estimatedMinutes: 10, published: true },
      { id: "m8-t4", title: "Dictionary Methods", slug: "methods", description: "keys(), values(), items().", estimatedMinutes: 10, published: true },
    ],
  },
  {
    id: 9,
    name: "Python Conditional Statements",
    slug: "conditionals",
    description: "Make decisions with if / elif / else.",
    icon: "🔀",
    course: "python",
    phase: "foundations",
    topics: [
      { id: "m9-t1", title: "if Statement", slug: "if", description: "Run code only when true.", estimatedMinutes: 10, published: true },
      { id: "m9-t2", title: "if-else", slug: "if-else", description: "Two paths.", estimatedMinutes: 10, published: true },
      { id: "m9-t3", title: "if-elif-else", slug: "if-elif-else", description: "Many paths.", estimatedMinutes: 12, published: true },
    ],
  },
  {
    id: 10,
    name: "Loops in Python",
    slug: "loops",
    description: "Repeat work with while and for.",
    icon: "🔁",
    course: "python",
    phase: "foundations",
    topics: [
      { id: "m10-t1", title: "while Loop", slug: "while", description: "Repeat while condition is true.", estimatedMinutes: 10, published: true },
      { id: "m10-t2", title: "for Loop", slug: "for", description: "Loop over sequences.", estimatedMinutes: 10, published: true },
      { id: "m10-t3", title: "break and continue", slug: "break-continue", description: "Control the loop.", estimatedMinutes: 8, published: true },
      { id: "m10-t4", title: "pass", slug: "pass", description: "Placeholder — do nothing.", estimatedMinutes: 5, published: true },
      { id: "m10-t5", title: "range()", slug: "range", description: "Numbers for looping.", estimatedMinutes: 8, published: true },
    ],
  },
  {
    id: 11,
    name: "List and Dictionary Comprehensions",
    slug: "comprehensions",
    description: "Short, powerful ways to build lists and dicts.",
    icon: "⚡",
    course: "python",
    phase: "foundations",
    topics: [
      { id: "m11-t1", title: "List Comprehension Syntax", slug: "list-comprehension", description: "One-line list building.", estimatedMinutes: 12, published: true },
      { id: "m11-t2", title: "Uses of Comprehensions", slug: "uses", description: "When and why to use them.", estimatedMinutes: 10, published: true },
      { id: "m11-t3", title: "Dictionary Comprehensions", slug: "dict-comprehension", description: "Same idea for dicts.", estimatedMinutes: 10, published: true },
    ],
  },
  {
    id: 12,
    name: "Functions in Python",
    slug: "functions",
    description: "Reusable blocks of code.",
    icon: "🧩",
    course: "python",
    phase: "foundations",
    topics: [
      { id: "m12-t1", title: "Creating Functions", slug: "creating", description: "def my_function():", estimatedMinutes: 10, published: true },
      { id: "m12-t2", title: "Calling Functions", slug: "calling", description: "Use what you defined.", estimatedMinutes: 8, published: true },
      { id: "m12-t3", title: "Function Arguments", slug: "arguments", description: "Pass data in.", estimatedMinutes: 12, published: true },
      { id: "m12-t4", title: "Variables in Functions", slug: "variables", description: "Local vs global.", estimatedMinutes: 10, published: true },
      { id: "m12-t5", title: "Recursion", slug: "recursion", description: "Functions calling themselves.", estimatedMinutes: 14, published: true },
    ],
  },
  {
    id: 13,
    name: "Anonymous Functions",
    slug: "lambda",
    description: "Small one-line functions with lambda.",
    icon: "👻",
    course: "python",
    phase: "foundations",
    topics: [
      { id: "m13-t1", title: "Lambda Functions", slug: "lambda-functions", description: "lambda x: x * 2", estimatedMinutes: 10, published: true },
    ],
  },
];

/** All modules across all courses — the single source of truth for routing. */
export const modules: Module[] = [...pythonModules, ...agenticAiModules];

// ── Course-aware helpers ───────────────────────────────────────────────────────

export function getModulesByCourse(courseId: CourseId): Module[] {
  return modules.filter((m) => m.course === courseId);
}

// ── Generic helpers ────────────────────────────────────────────────────────────

export function getModuleBySlug(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getTopic(moduleSlug: string, topicSlug: string) {
  const mod = getModuleBySlug(moduleSlug);
  if (!mod) return undefined;
  const topic = mod.topics.find((t) => t.slug === topicSlug);
  if (!topic) return undefined;
  return { module: mod, topic };
}

export function getAllPublishedTopics() {
  return modules.flatMap((m) =>
    m.topics.filter((t) => t.published).map((t) => ({ module: m, topic: t }))
  );
}

export function getTotalTopicCount() {
  return modules.reduce((acc, m) => acc + m.topics.length, 0);
}

export function getPublishedTopicCount() {
  return modules.reduce(
    (acc, m) => acc + m.topics.filter((t) => t.published).length,
    0
  );
}

/** Flat list of published topics in course order (for prev/next navigation within a course). */
export function getPublishedTopicPath(courseId?: CourseId) {
  const source = courseId ? getModulesByCourse(courseId) : modules;
  return source.flatMap((m) =>
    m.topics
      .filter((t) => t.published)
      .map((topic) => ({ module: m, topic }))
  );
}

export function getAdjacentPublishedTopics(moduleSlug: string, topicSlug: string) {
  const mod = getModuleBySlug(moduleSlug);
  // Navigate only within the same course so Python prev/next never bleeds into AI topics
  const path = getPublishedTopicPath(mod?.course);
  const i = path.findIndex(
    (p) => p.module.slug === moduleSlug && p.topic.slug === topicSlug
  );
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? path[i - 1] : null,
    next: i < path.length - 1 ? path[i + 1] : null,
  };
}
