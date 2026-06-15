import type { Course } from "@/lib/types";

export const courses: Course[] = [
  {
    id: "python",
    name: "Python for Data Science",
    slug: "python",
    tagline: "Learn Python from scratch — structured lessons with hands-on practice.",
    description:
      "Start from zero and build a solid Python foundation. Covers syntax, data structures, functions, and the tools used in data science.",
    icon: "🐍",
    level: "beginner",
    color: "brand",
  },
  {
    id: "agentic-ai",
    name: "Agentic AI",
    slug: "agentic-ai",
    tagline: "Build real AI chatbots and agents using LLMs and the Groq API.",
    description:
      "Learn how LLMs work, master prompt engineering, and build your own chatbots and AI agents using the Groq API — testing everything live inside the platform.",
    icon: "🤖",
    level: "intermediate",
    color: "violet",
  },
];

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}
