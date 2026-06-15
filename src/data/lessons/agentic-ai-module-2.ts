import type { TopicLesson } from "@/lib/types";

export const agenticAiModule2Lessons: Record<string, TopicLesson> = {
  "ai-m2-t1": {
    topicId: "ai-m2-t1",
    intro: "A prompt is the text you send to an LLM. The quality of your prompt directly determines the quality of the response — this skill is called prompt engineering.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Build a prompt",
        practicePrompt: "A good prompt is clear, specific, and gives context. Practice constructing one.",
        starterCode: '# A prompt has three key ingredients:\n# 1. Context  – what situation is the AI in?\n# 2. Task     – what do you want it to do?\n# 3. Format   – how should the answer look?\n\ncontext = "You are a helpful Python tutor for beginners."\ntask    = "Explain what a variable is."\nformat_ = "Use simple language and one short example."\n\nprompt = f"{context}\\n\\nTask: {task}\\n\\nFormat: {format_}"\nprint(prompt)',
      },
    ],
    keyTakeaways: [
      "A prompt is your only way to communicate intent to an LLM.",
      "Clear, specific prompts get better results than vague ones.",
      "Context, task, and format are the three key ingredients of a good prompt.",
    ],
  },
  "ai-m2-t2": {
    topicId: "ai-m2-t2",
    intro: "When you call an LLM API, there are two types of messages: the system prompt (persistent instructions) and user messages (the conversation). Mastering both gives you full control.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Message structure",
        practicePrompt: "This is how a Groq/OpenAI API call is structured as a Python dict.",
        starterCode: 'messages = [\n    {\n        "role": "system",\n        "content": "You are a concise Python tutor. Always give code examples."\n    },\n    {\n        "role": "user",\n        "content": "What is a list in Python?"\n    }\n]\n\nfor msg in messages:\n    print(f"[{msg[\'role\'].upper()}]")\n    print(msg[\'content\'])\n    print()',
      },
    ],
    keyTakeaways: [
      "The system prompt sets the AI's persona and rules — the user never sees it.",
      "User messages are the conversation turns from the human.",
      "Assistant messages are the AI's previous replies (used for multi-turn chat).",
    ],
  },
  "ai-m2-t3": {
    topicId: "ai-m2-t3",
    intro: "Few-shot prompting means showing the model a few examples of what you want before asking your question. It's one of the most powerful techniques in prompt engineering.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Build a few-shot prompt",
        practicePrompt: "Create a few-shot prompt that teaches the model to classify emails.",
        starterCode: 'few_shot_prompt = """\nClassify each email as SPAM or NOT SPAM.\n\nEmail: "Congratulations! You won $1,000,000! Click here!"\nLabel: SPAM\n\nEmail: "Hi, your package will arrive tomorrow between 2-4pm."\nLabel: NOT SPAM\n\nEmail: "URGENT: Your account has been compromised! Reset now!"\nLabel: SPAM\n\nEmail: "Meeting rescheduled to 3pm on Thursday."\nLabel:\n"""\n\nprint(few_shot_prompt)\nprint("(An LLM would continue with: NOT SPAM)")',
      },
    ],
    keyTakeaways: [
      "Few-shot prompting teaches the model the pattern you want by example.",
      "Use 2–5 examples — more is not always better.",
      "Make sure your examples cover edge cases relevant to your use case.",
    ],
  },
  "ai-m2-t4": {
    topicId: "ai-m2-t4",
    intro: "Chain-of-thought prompting asks the model to think step by step before giving a final answer. This dramatically improves accuracy on complex tasks.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Chain-of-thought example",
        practicePrompt: "See the difference between a direct prompt and a chain-of-thought prompt.",
        starterCode: '# Without chain-of-thought:\ndirect_prompt = "Is 97 a prime number? Answer yes or no."\n\n# With chain-of-thought:\ncot_prompt = """\nIs 97 a prime number? Think step by step.\n\n1. Check if 97 is divisible by 2 → 97 / 2 = 48.5 (no)\n2. Check if 97 is divisible by 3 → 97 / 3 = 32.3 (no)\n3. Check if 97 is divisible by 5 → 97 / 5 = 19.4 (no)\n4. Check if 97 is divisible by 7 → 97 / 7 = 13.9 (no)\n5. √97 ≈ 9.8, so we only need to check primes up to 9.\n6. No divisors found. Therefore 97 IS prime.\n"""\n\nprint("Direct prompt:")\nprint(direct_prompt)\nprint()\nprint("Chain-of-thought prompt:")\nprint(cot_prompt)',
      },
    ],
    keyTakeaways: [
      "Adding 'think step by step' or 'let's think this through' improves reasoning.",
      "Chain-of-thought works especially well for maths, logic, and multi-step problems.",
      "The model's reasoning steps also help you debug when it goes wrong.",
    ],
  },
  "ai-m2-t5": {
    topicId: "ai-m2-t5",
    intro: "Great prompt engineers follow a set of proven patterns. These best practices will save you hours of trial and error when building AI applications.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Prompt checklist",
        practicePrompt: "Run this checklist against any prompt you write.",
        starterCode: 'def evaluate_prompt(prompt: str) -> None:\n    checks = {\n        "Is specific (not vague)": len(prompt) > 20,\n        "Has context": any(w in prompt.lower() for w in ["you are", "your role", "context"]),\n        "States the task clearly": "?" in prompt or any(w in prompt.lower() for w in ["write", "explain", "list", "create", "summarise"]),\n        "Specifies output format": any(w in prompt.lower() for w in ["format", "bullet", "paragraph", "json", "table", "short", "brief"]),\n    }\n    \n    print("Prompt evaluation:")\n    for check, passed in checks.items():\n        status = "✅" if passed else "❌"\n        print(f"  {status}  {check}")\n\nprompt = "You are a Python tutor. Explain f-strings briefly with one example."\nevaluate_prompt(prompt)',
      },
    ],
    keyTakeaways: [
      "Be specific: vague prompts get vague answers.",
      "Specify the output format (bullet list, JSON, paragraph, code block).",
      "Iterate: test your prompt, see where it fails, and improve it.",
      "Avoid negatives ('don't do X') — tell the model what TO do instead.",
    ],
  },
};
