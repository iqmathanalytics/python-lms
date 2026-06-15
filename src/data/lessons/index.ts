import type { TopicLesson } from "@/lib/types";
import { module1Lessons } from "./module-1";
import { module2Lessons } from "./module-2";
import { module3Lessons } from "./module-3";
import { module4Lessons } from "./module-4";
import { module5Lessons } from "./module-5";
import { module6Lessons } from "./module-6";
import { module7Lessons } from "./module-7";
import { module8Lessons } from "./module-8";
import { module9Lessons } from "./module-9";
import { module10Lessons } from "./module-10";
import { module11Lessons } from "./module-11";
import { module12Lessons } from "./module-12";
import { module13Lessons } from "./module-13";
import { agenticAiModule1Lessons } from "./agentic-ai-module-1";
import { agenticAiModule2Lessons } from "./agentic-ai-module-2";
import { agenticAiModule3Lessons } from "./agentic-ai-module-3";
import { agenticAiModule4Lessons } from "./agentic-ai-module-4";
import { agenticAiModule5Lessons } from "./agentic-ai-module-5";
import { agenticAiModule6Lessons } from "./agentic-ai-module-6";

const allLessons: Record<string, TopicLesson> = {
  ...module1Lessons,
  ...module2Lessons,
  ...module3Lessons,
  ...module4Lessons,
  ...module5Lessons,
  ...module6Lessons,
  ...module7Lessons,
  ...module8Lessons,
  ...module9Lessons,
  ...module10Lessons,
  ...module11Lessons,
  ...module12Lessons,
  ...module13Lessons,
  ...agenticAiModule1Lessons,
  ...agenticAiModule2Lessons,
  ...agenticAiModule3Lessons,
  ...agenticAiModule4Lessons,
  ...agenticAiModule5Lessons,
  ...agenticAiModule6Lessons,
};

export function getLesson(topicId: string): TopicLesson | undefined {
  return allLessons[topicId];
}
