export type TopicStatus = "not_started" | "in_progress" | "completed";

export type CourseId = "python" | "agentic-ai";

export interface Course {
  id: CourseId;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
  level: "beginner" | "intermediate" | "advanced";
  /** Tailwind color token used for theming course cards/badges */
  color: string;
}

export interface Topic {
  id: string;
  title: string;
  slug: string;
  description: string;
  estimatedMinutes: number;
  /** When false, topic shows as "coming soon" */
  published: boolean;
  /** Optional unlisted YouTube video ID (e.g. "dQw4w9WgXcQ") for the topic tutorial overlay */
  videoUrl?: string;
}

export interface Module {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  topics: Topic[];
  course: CourseId;
  /** Track phase within the course */
  phase: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TopicQuiz {
  topicId: string;
  title: string;
  questions: QuizQuestion[];
}

export type LessonInfographic =
  | "intro-programming"
  | "choosing-python"
  | "setting-up-python"
  | "python-ides"
  | "input-output"
  | "comments"
  | "variables"
  | "data-types"
  | "typecasting"
  | "math-operators"
  | "assignment-operators"
  | "comparison-operators"
  | "logical-operators"
  | "identity-operators"
  | "membership-operators"
  | "bitwise-operators"
  | "creating-strings"
  | "formatting-strings"
  | "string-indexing"
  | "string-slicing"
  | "string-methods"
  | "creating-lists"
  | "list-characteristics"
  | "list-indexing"
  | "list-slicing"
  | "list-methods"
  | "list-modifying"
  | "tuple-syntax"
  | "tuple-indexing"
  | "tuple-properties"
  | "tuple-slicing"
  | "tuple-methods"
  | "set-syntax"
  | "set-updating"
  | "set-operations"
  | "set-methods"
  | "dictionary-syntax"
  | "dictionary-keys-values"
  | "dictionary-accessing"
  | "dictionary-methods"
  | "if-statement"
  | "if-else"
  | "if-elif-else"
  | "while-loop"
  | "for-loop"
  | "break-continue"
  | "pass-statement"
  | "range-function"
  | "list-comprehension"
  | "comprehension-uses"
  | "dict-comprehension"
  | "functions-creating"
  | "functions-calling"
  | "function-arguments"
  | "function-variables"
  | "function-recursion"
  | "lambda-functions";

export interface LessonBlock {
  type:
    | "heading"
    | "paragraph"
    | "list"
    | "tip"
    | "diagram"
    | "code"
    | "practice"
    | "visual"
    | "infographic"
    | "groq-playground";
  content?: string;
  items?: string[];
  /** For code blocks */
  code?: string;
  /** For diagram: ascii or mermaid-like description rendered as visual */
  diagram?: DiagramData;
  /** Practice prompt shown above IDE */
  practicePrompt?: string;
  starterCode?: string;
  /** Short label for IDE exercise tabs */
  practiceLabel?: string;
  /** Load in IDE only — no practice card in lesson body */
  ideOnly?: boolean;
  /** Named infographic layout for rich lesson visuals */
  infographic?: LessonInfographic;
  /** Default system prompt for the Groq playground (groq-playground block only) */
  systemPrompt?: string;
}

export interface DiagramData {
  title: string;
  nodes: { id: string; label: string; sublabel?: string }[];
  arrows?: { from: string; to: string; label?: string }[];
  variant?: "flow" | "compare" | "stack";
}

export interface TopicLesson {
  topicId: string;
  intro: string;
  blocks: LessonBlock[];
  keyTakeaways: string[];
}

export interface UserProgress {
  completedTopics: string[];
  quizScores: Record<string, number>;
  ideRan: string[];
  lastVisited?: string;
}

export type PracticeDifficulty = "easy" | "medium" | "hard";

export type PracticeStatus = "not_started" | "attempted" | "solved";

export interface PracticeTest {
  id: string;
  label: string;
  setup?: string;
  stdin?: string;
  expectedStdout?: string;
  assertCode?: string;
  visibility: "public";
}

export interface PracticeExample {
  input?: string;
  output: string;
  explanation?: string;
}

export interface PracticeChallengeSegment {
  type: "text" | "code";
  value: string;
}

export type PracticeLiveCheckRule =
  | {
      id: string;
      label: string;
      kind: "print-count";
      expected: number;
    }
  | {
      id: string;
      label: string;
      kind: "print-value";
      index: number;
      expected: string;
    }
  | {
      id: string;
      label: string;
      kind: "print-contains";
      value: string;
    }
  | {
      id: string;
      label: string;
      kind: "print-sequence";
      expected: string[];
    };

export interface PracticeChallengeApproachLine {
  type: "number" | "string";
  value: string;
}

export interface PracticeChallengeContent {
  introSegments?: PracticeChallengeSegment[];
  introLead?: string;
  introBullets?: PracticeChallengeSegment[][];
  introFooter?: PracticeChallengeSegment[];
  learnSection?: {
    title: string;
    body: string;
    codeExample: string;
  };
  steps?: {
    title: string;
    items: string[];
    codePreview?: {
      comment?: string;
      lines: string[];
    };
  };
  approaches?: {
    title: string;
    items: Array<{
      title: string;
      note: string;
      lines: PracticeChallengeApproachLine[];
    }>;
  };
  inputLabel?: string;
  outputOnly?: boolean;
  requiresComment?: boolean;
  badgeVariant?: "blue";
  expectCommaPrint?: boolean;
  requiresForLoop?: boolean;
  requiresIfCondition?: boolean;
  requiresFunction?: string;
  requiresVariables?: string[];
  requiresListAccess?: boolean;
  requiresDictKey?: string;
  editorPlaceholder?: string;
  liveCheckRules?: PracticeLiveCheckRule[];
  emptyMessage?: string;
  successDetail?: string;
  printCountHint?: string;
}

export interface PracticeProblem {
  id: string;
  topicId: string;
  slug: string;
  title: string;
  difficulty: PracticeDifficulty;
  order: number;
  description: string;
  layout?: "default" | "challenge";
  challengeContent?: PracticeChallengeContent;
  examples?: PracticeExample[];
  constraints?: string[];
  hints: string[];
  starterCode: string;
  publicTests: PracticeTest[];
}

export interface LessonProgressRow {
  user_id: string;
  topic_id: string;
  completed: boolean;
  quiz_score: number;
  last_visited_at: string | null;
}

export interface PracticeProgressRow {
  user_id: string;
  problem_id: string;
  status: PracticeStatus;
  code_draft: string;
  public_passed: boolean;
  hidden_passed: boolean;
  submitted_at: string | null;
  updated_at: string;
}

export interface EntitlementRow {
  id: string;
  user_id: string;
  product: string;
  stripe_payment_intent: string | null;
  purchased_at: string;
}

export interface ProfileRow {
  id: string;
  full_name: string;
  mobile: string;
  created_at: string;
}
