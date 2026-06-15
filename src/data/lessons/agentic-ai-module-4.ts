import type { TopicLesson } from "@/lib/types";

export const agenticAiModule4Lessons: Record<string, TopicLesson> = {
  "ai-m4-t1": {
    topicId: "ai-m4-t1",
    intro: "LLMs are stateless — they have no memory between calls. To build a chatbot that remembers the conversation, you pass the full chat history with every API call.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Build chat history",
        practicePrompt: "Simulate how chat history is accumulated across multiple turns.",
        starterCode: 'def add_message(history: list, role: str, content: str) -> list:\n    """Add a message to the chat history."""\n    history.append({"role": role, "content": content})\n    return history\n\n# Start with a system prompt\nhistory = [{"role": "system", "content": "You are a helpful Python tutor."}]\n\n# Simulate a conversation\nhistory = add_message(history, "user",      "What is a list?")\nhistory = add_message(history, "assistant", "A list is an ordered, mutable collection: [1, 2, 3]")\nhistory = add_message(history, "user",      "Can it hold different types?")\nhistory = add_message(history, "assistant", "Yes! [1, \'hello\', True, 3.14] is valid.")\nhistory = add_message(history, "user",      "How do I add an item?")\n\n# This full history goes to the API on every call\nprint(f"Messages in history: {len(history)}")\nfor msg in history:\n    print(f"  [{msg[\'role\']:9}] {msg[\'content\']}")',
      },
    ],
    keyTakeaways: [
      "LLMs have no built-in memory — you must pass the full conversation each time.",
      "The history is a list of {'role': ..., 'content': ...} dicts.",
      "Watch the context window — very long histories need to be truncated or summarised.",
    ],
  },
  "ai-m4-t2": {
    topicId: "ai-m4-t2",
    intro: "Now let's put it all together. A complete chatbot is a loop that takes user input, adds it to history, calls the API, gets a reply, and adds that reply to history too.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Chatbot structure",
        practicePrompt: "Study this chatbot loop — it's the core pattern for every conversational AI app.",
        starterCode: '# Full chatbot pattern (without real API call for the IDE)\n\ndef simulate_llm_response(messages: list) -> str:\n    """Placeholder — in real code, call groq client here."""\n    last_user_msg = messages[-1]["content"]\n    return f"[AI response to: {last_user_msg[:40]}]"\n\ndef run_chatbot():\n    print("Chatbot ready! (type \'quit\' to exit)")\n    \n    history = [\n        {"role": "system", "content": "You are a helpful Python tutor."}\n    ]\n    \n    # Simulate 3 turns\n    test_inputs = ["What is a variable?", "Give me an example.", "Thank you!"]\n    \n    for user_input in test_inputs:\n        print(f"\\nYou: {user_input}")\n        \n        # Add user message to history\n        history.append({"role": "user", "content": user_input})\n        \n        # Get AI response (replace with real API call)\n        reply = simulate_llm_response(history)\n        \n        # Add AI reply to history\n        history.append({"role": "assistant", "content": reply})\n        \n        print(f"Bot: {reply}")\n    \n    print(f"\\nTotal messages in history: {len(history)}")\n\nrun_chatbot()',
      },
    ],
    keyTakeaways: [
      "The chatbot loop: get input → append to history → call API → append reply → repeat.",
      "Always append both the user message AND the assistant reply to maintain context.",
      "A system prompt at the start of history controls the bot's persona across the whole conversation.",
    ],
  },
  "ai-m4-t3": {
    topicId: "ai-m4-t3",
    intro: "Now test the chatbot you have been building — live, in your browser. Paste your Groq API key on the right, customise the system prompt, choose a model, and start chatting. Your key is never stored on our servers.",
    blocks: [
      {
        type: "groq-playground",
        systemPrompt: "You are a helpful Python and AI tutor. Answer clearly and concisely, using short code examples where useful.",
      },
    ],
    keyTakeaways: [
      "The system prompt shapes every response — try changing it and see the difference.",
      "Your Groq API key is sent directly from your browser to our server-side proxy, then to Groq. It is never logged or stored.",
      "LLaMA 3 70B gives the best answers; LLaMA 3 8B is fastest for quick tests.",
    ],
  },
  "ai-m4-t4": {
    topicId: "ai-m4-t4",
    intro: "Streaming makes your chatbot feel instant — words appear as they are generated, just like ChatGPT. Without streaming, the user waits for the whole response before seeing anything.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Streaming template",
        practicePrompt: "See the streaming API pattern. The key change is stream=True.",
        starterCode: '# Streaming response template for Groq\n# In real code, uncomment the groq imports and client\n\nimport time\n\ndef simulate_streaming(text: str):\n    """Simulate word-by-word streaming output."""\n    words = text.split()\n    for word in words:\n        print(word, end=" ", flush=True)\n        time.sleep(0.05)  # simulate network delay\n    print()  # newline at end\n\n"""\n# Real streaming code:\nstream = client.chat.completions.create(\n    model="llama3-70b-8192",\n    messages=messages,\n    stream=True  # ← this is the only change!\n)\n\nfor chunk in stream:\n    if chunk.choices[0].delta.content:\n        print(chunk.choices[0].delta.content, end="", flush=True)\n"""\n\n# Simulated output:\nprint("Bot: ", end="")\nsimulate_streaming("Streaming makes responses feel instant because words appear as they are generated rather than all at once.")',
      },
    ],
    keyTakeaways: [
      "Add stream=True to your API call to enable streaming.",
      "Iterate over the stream and print each chunk.choices[0].delta.content as it arrives.",
      "Streaming significantly improves perceived performance for long responses.",
    ],
  },
  "ai-m4-t5": {
    topicId: "ai-m4-t5",
    intro: "Two API parameters — temperature and max_tokens — have a huge impact on response quality. Understanding them lets you fine-tune your chatbot's behaviour precisely.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Parameter effects",
        practicePrompt: "See how temperature and max_tokens change the style and length of responses.",
        starterCode: 'configs = [\n    {\n        "name": "Precise / Factual",\n        "temperature": 0.1,\n        "max_tokens": 200,\n        "use_case": "Code generation, factual Q&A, data extraction"\n    },\n    {\n        "name": "Balanced",\n        "temperature": 0.7,\n        "max_tokens": 500,\n        "use_case": "General chatbot, tutoring, explanations"\n    },\n    {\n        "name": "Creative",\n        "temperature": 1.2,\n        "max_tokens": 1000,\n        "use_case": "Story writing, brainstorming, poetry"\n    },\n]\n\nfor cfg in configs:\n    print(f"\\n--- {cfg[\'name\']} ---")\n    print(f"  temperature: {cfg[\'temperature\']}")\n    print(f"  max_tokens:  {cfg[\'max_tokens\']}")\n    print(f"  best for:    {cfg[\'use_case\']}")',
      },
    ],
    keyTakeaways: [
      "Temperature (0–2): lower = more focused and deterministic, higher = more creative and varied.",
      "max_tokens limits the length of the reply — set it to avoid unexpectedly long (costly) responses.",
      "For a coding assistant use temperature 0.1–0.3; for creative writing use 0.8–1.2.",
    ],
  },
};
