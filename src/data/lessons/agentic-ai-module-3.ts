import type { TopicLesson } from "@/lib/types";

export const agenticAiModule3Lessons: Record<string, TopicLesson> = {
  "ai-m3-t1": {
    topicId: "ai-m3-t1",
    intro: "Groq offers free API access to fast open-source LLMs. You'll need a free API key to run the code in this module.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Setup check",
        practicePrompt: "Run this to confirm your Python environment is ready for the Groq SDK.",
        starterCode: '# Before calling the Groq API you need:\n# 1. A free Groq account → console.groq.com\n# 2. An API key from the Groq console\n# 3. The groq Python package: pip install groq\n\n# Let\'s verify the package is available:\ntry:\n    import groq\n    print("✅ groq package is installed")\nexcept ImportError:\n    print("❌ Run: pip install groq")\n\nprint("\\nGet your free API key at: https://console.groq.com")',
      },
    ],
    keyTakeaways: [
      "Groq provides a free tier with generous rate limits — perfect for learning.",
      "Your API key is a secret — never commit it to GitHub or share it publicly.",
      "Store API keys in environment variables or a .env file, not in your code.",
    ],
  },
  "ai-m3-t2": {
    topicId: "ai-m3-t2",
    intro: "With your API key ready, you can make your first call to an LLM in just 8 lines of Python. The Groq SDK is compatible with the OpenAI SDK, so the patterns you learn here transfer everywhere.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "First API call",
        practicePrompt: "This is the template for every Groq API call. Study the structure.",
        starterCode: 'import os\n# from groq import Groq  # uncomment when running locally\n\n# Structure of a Groq API call:\napi_call_template = """\nfrom groq import Groq\n\nclient = Groq(api_key="YOUR_API_KEY")\n\nresponse = client.chat.completions.create(\n    model="llama3-70b-8192",\n    messages=[\n        {"role": "system", "content": "You are a helpful assistant."},\n        {"role": "user",   "content": "What is Python in one sentence?"}\n    ]\n)\n\nprint(response.choices[0].message.content)\n"""\n\nprint("Groq API call template:")\nprint(api_call_template)',
      },
    ],
    keyTakeaways: [
      "Create a Groq client once and reuse it for all your calls.",
      "The messages list follows the role/content format: system, user, assistant.",
      "The response is at response.choices[0].message.content",
    ],
  },
  "ai-m3-t3": {
    topicId: "ai-m3-t3",
    intro: "The Groq API returns a JSON response object. Knowing how to navigate it lets you extract exactly what you need — the text, token usage, and more.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Parse a response",
        practicePrompt: "Simulate parsing a Groq response object (same structure as the real thing).",
        starterCode: '# Simulate a Groq API response\nresponse_dict = {\n    "id": "chatcmpl-abc123",\n    "model": "llama3-70b-8192",\n    "choices": [\n        {\n            "index": 0,\n            "message": {\n                "role": "assistant",\n                "content": "Python is a high-level, readable programming language."\n            },\n            "finish_reason": "stop"\n        }\n    ],\n    "usage": {\n        "prompt_tokens": 25,\n        "completion_tokens": 12,\n        "total_tokens": 37\n    }\n}\n\n# Extract the reply\nreply = response_dict["choices"][0]["message"]["content"]\nprint("Reply:", reply)\n\n# Extract token usage\nusage = response_dict["usage"]\nprint(f"Tokens used: {usage[\'total_tokens\']} (prompt: {usage[\'prompt_tokens\']}, reply: {usage[\'completion_tokens\']})")',
      },
    ],
    keyTakeaways: [
      "The actual text is at response.choices[0].message.content",
      "finish_reason tells you why the model stopped: 'stop' = completed normally.",
      "usage shows how many tokens were consumed — important for cost tracking.",
    ],
  },
  "ai-m3-t4": {
    topicId: "ai-m3-t4",
    intro: "Groq supports several open-source models. Each has different strengths — knowing when to use which model makes your applications faster and cheaper.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Model comparison",
        practicePrompt: "Print the key specs for Groq's available models.",
        starterCode: 'models = [\n    {\n        "id": "llama3-70b-8192",\n        "params": "70B",\n        "context": 8192,\n        "best_for": "General tasks, reasoning, coding"\n    },\n    {\n        "id": "llama3-8b-8192",\n        "params": "8B",\n        "context": 8192,\n        "best_for": "Fast, simple tasks, low cost"\n    },\n    {\n        "id": "mixtral-8x7b-32768",\n        "params": "46B MoE",\n        "context": 32768,\n        "best_for": "Long documents, multilingual"\n    },\n    {\n        "id": "gemma-7b-it",\n        "params": "7B",\n        "context": 8192,\n        "best_for": "Lightweight tasks"\n    },\n]\n\nprint(f"{"Model":<30} {"Params":<10} {"Context":<10} Best for")\nprint("-" * 75)\nfor m in models:\n    print(f"{m[\'id\']:<30} {m[\'params\']:<10} {m[\'context\']:<10} {m[\'best_for\']}")',
      },
    ],
    keyTakeaways: [
      "llama3-70b-8192 is the best default choice for most tasks.",
      "llama3-8b-8192 is 10x faster and cheaper — use it for simple or high-volume tasks.",
      "mixtral-8x7b-32768 has a 32k context window — ideal for long documents.",
    ],
  },
  "ai-m3-t5": {
    topicId: "ai-m3-t5",
    intro: "APIs fail — networks time out, rate limits are hit, and servers go down. Writing resilient error handling from the start saves you from debugging in production.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Error handling template",
        practicePrompt: "This is the production-ready error handling pattern for Groq API calls.",
        starterCode: 'import time\n\ndef call_with_retry(prompt: str, max_retries: int = 3) -> str:\n    """\n    Template for a resilient Groq API call with retry logic.\n    In real code, replace the simulated call with actual groq client call.\n    """\n    for attempt in range(1, max_retries + 1):\n        try:\n            # Simulate API call (replace with real groq call)\n            if attempt < 2:\n                raise ConnectionError("Simulated rate limit error")\n            \n            # Simulated successful response\n            return f"Response to: {prompt[:30]}..."\n            \n        except ConnectionError as e:\n            print(f"Attempt {attempt} failed: {e}")\n            if attempt < max_retries:\n                wait = 2 ** attempt  # exponential backoff\n                print(f"Retrying in {wait}s...")\n                time.sleep(wait)\n            else:\n                return "Error: all retries exhausted"\n\nresult = call_with_retry("Explain Python decorators")\nprint("Result:", result)',
      },
    ],
    keyTakeaways: [
      "Always wrap API calls in try/except blocks.",
      "Use exponential backoff for retries: wait 2s, 4s, 8s between attempts.",
      "Rate limit errors (429) are normal — your app should handle them gracefully.",
    ],
  },
};
