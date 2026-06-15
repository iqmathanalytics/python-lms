import type { TopicLesson } from "@/lib/types";

export const agenticAiModule1Lessons: Record<string, TopicLesson> = {
  "ai-m1-t1": {
    topicId: "ai-m1-t1",
    intro: "Artificial Intelligence is software that can perform tasks that normally require human thinking — like understanding language, recognising images, or making decisions.",
    blocks: [
      {
        type: "practice",
        practicePrompt: "This lesson has a Python exercise coming soon. For now, explore the concept above.",
        starterCode: '# What is AI?\n# AI systems learn patterns from data.\n# Large Language Models (LLMs) are a type of AI trained on text.\n\nprint("AI is software that mimics human thinking.")\nprint("LLMs are trained on billions of words.")',
      },
    ],
    keyTakeaways: [
      "AI is software trained on data to perform tasks that require human-like reasoning.",
      "Machine learning is the branch of AI that learns from examples rather than explicit rules.",
      "Large Language Models (LLMs) are AI systems trained on massive amounts of text.",
    ],
  },
  "ai-m1-t2": {
    topicId: "ai-m1-t2",
    intro: "A Large Language Model is an AI system trained on enormous amounts of text. It learns to predict the next word — and from that, it learns language, facts, and reasoning.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Explore tokens",
        practicePrompt: "Tokens are the building blocks LLMs see. Run this to see how text is split.",
        starterCode: 'text = "Hello, how are you today?"\n# LLMs see text as chunks called tokens\n# Each word (or part of a word) is a token\nwords = text.split()\nprint(f"Words: {words}")\nprint(f"Approximate token count: {len(words)}")',
      },
    ],
    keyTakeaways: [
      "LLMs predict the next token based on all previous tokens in the context.",
      "They are trained on internet-scale text datasets using self-supervised learning.",
      "Despite their simple training objective, they develop complex reasoning abilities.",
    ],
  },
  "ai-m1-t3": {
    topicId: "ai-m1-t3",
    intro: "LLMs break text into tokens, process them through billions of parameters, and generate a probability distribution over the next token. This happens billions of times per response.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Context window demo",
        practicePrompt: "The context window is how much text the model can 'see' at once. Simulate this concept.",
        starterCode: 'context_window = 8192  # tokens for many models\nchars_per_token = 4    # rough average\nmax_chars = context_window * chars_per_token\n\nprint(f"Context window: {context_window} tokens")\nprint(f"That is roughly {max_chars:,} characters")\nprint(f"Or about {max_chars // 250} pages of text")',
      },
    ],
    keyTakeaways: [
      "Tokens are chunks of text — roughly 4 characters each on average.",
      "The context window is the maximum amount of text the model can process at once.",
      "Temperature controls randomness: low = precise, high = creative.",
    ],
  },
  "ai-m1-t4": {
    topicId: "ai-m1-t4",
    intro: "Several companies offer powerful LLMs via API. Understanding their differences helps you pick the right model for your project.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Compare providers",
        practicePrompt: "Print a comparison of the main LLM providers.",
        starterCode: 'providers = [\n    {"name": "OpenAI", "models": "GPT-4o, GPT-4", "known_for": "Best overall quality"},\n    {"name": "Anthropic", "models": "Claude 3.5", "known_for": "Safety and long context"},\n    {"name": "Google", "models": "Gemini 1.5", "known_for": "Multimodal + huge context"},\n    {"name": "Groq", "models": "LLaMA, Mixtral", "known_for": "Fastest inference speed"},\n]\n\nfor p in providers:\n    print(f"{p[\'name\']:12} | {p[\'models\']:20} | {p[\'known_for\']}")',
      },
    ],
    keyTakeaways: [
      "OpenAI, Anthropic, Google, and Meta all offer world-class LLMs.",
      "Groq provides extremely fast inference on open-source models — ideal for real-time apps.",
      "You choose a provider based on speed, cost, capability, and privacy requirements.",
    ],
  },
};
