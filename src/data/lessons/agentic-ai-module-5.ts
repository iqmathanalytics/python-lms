import type { TopicLesson } from "@/lib/types";

export const agenticAiModule5Lessons: Record<string, TopicLesson> = {
  "ai-m5-t1": {
    topicId: "ai-m5-t1",
    intro: "An AI agent is an LLM that can take actions — it decides which tools to use, calls them, observes the result, and reasons about what to do next. This is what makes AI go from chatbot to assistant.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Agent vs chatbot",
        practicePrompt: "Compare the capabilities of a chatbot vs an agent.",
        starterCode: 'chatbot_capabilities = [\n    "Answer questions from training data",\n    "Hold a conversation with memory",\n    "Summarise, translate, explain text",\n    "Write and review code",\n]\n\nagent_capabilities = [\n    *chatbot_capabilities,  # everything a chatbot can do, plus:\n    "Search the web for real-time info",\n    "Read and write files",\n    "Call external APIs",\n    "Execute code and observe results",\n    "Plan multi-step tasks and recover from errors",\n]\n\nprint("=== Chatbot can ===")\nfor cap in chatbot_capabilities:\n    print(f"  ✓ {cap}")\n\nprint("\\n=== Agent can ===")\nfor cap in agent_capabilities:\n    marker = "★" if cap not in chatbot_capabilities else "✓"\n    print(f"  {marker} {cap}")',
      },
    ],
    keyTakeaways: [
      "An agent = LLM + tools + a loop that lets it take actions and observe results.",
      "The LLM acts as the 'brain' — it decides which tool to call and when.",
      "Agents can recover from mistakes by observing tool outputs and adjusting their plan.",
    ],
  },
  "ai-m5-t2": {
    topicId: "ai-m5-t2",
    intro: "Tool calling (also called function calling) lets you define Python functions and tell the LLM about them. The LLM then decides when to call them and passes the right arguments.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Define tools",
        practicePrompt: "Define two tools and see how they are described to the LLM.",
        starterCode: 'import json\n\n# 1. Define your Python functions\ndef get_weather(city: str) -> str:\n    """Simulate a weather API call."""\n    return f"The weather in {city} is 22°C and sunny."\n\ndef calculate(expression: str) -> str:\n    """Safely evaluate a math expression."""\n    try:\n        result = eval(expression, {"__builtins__": {}})\n        return str(result)\n    except Exception as e:\n        return f"Error: {e}"\n\n# 2. Describe them to the LLM in JSON schema format\ntools = [\n    {\n        "type": "function",\n        "function": {\n            "name": "get_weather",\n            "description": "Get the current weather for a city",\n            "parameters": {\n                "type": "object",\n                "properties": {\n                    "city": {"type": "string", "description": "The city name"}\n                },\n                "required": ["city"]\n            }\n        }\n    },\n]\n\nprint("Tool definition sent to LLM:")\nprint(json.dumps(tools[0], indent=2))\n\n# 3. The LLM responds with a tool call, you execute it:\nllm_tool_call = {"name": "get_weather", "arguments": {"city": "Mumbai"}}\nresult = get_weather(**llm_tool_call["arguments"])\nprint(f"\\nTool result: {result}")',
      },
    ],
    keyTakeaways: [
      "You describe tools to the LLM using JSON schema — name, description, and parameters.",
      "The LLM decides whether to call a tool based on the user's request.",
      "You execute the tool in Python and send the result back to the LLM.",
    ],
  },
  "ai-m5-t3": {
    topicId: "ai-m5-t3",
    intro: "A simple agent combines tool calling with a loop. The agent keeps running until the LLM decides it has enough information to give a final answer.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Agent loop",
        practicePrompt: "Trace through the agent loop step by step.",
        starterCode: 'import json\n\n# Available tools\ndef get_weather(city: str) -> str:\n    return f"22°C, sunny in {city}"\n\ndef search_web(query: str) -> str:\n    return f"Top result for \'{query}\': Python was created by Guido van Rossum in 1991."\n\nTOOLS = {"get_weather": get_weather, "search_web": search_web}\n\ndef run_agent(user_query: str, max_steps: int = 5):\n    """Simulate an agent loop."""\n    print(f"User: {user_query}\\n")\n    \n    # Simulate LLM deciding to use a tool\n    simulated_steps = [\n        {"action": "tool_call", "tool": "search_web",  "args": {"query": user_query}},\n        {"action": "final_answer", "text": "Based on my research: Python was created by Guido van Rossum in 1991 and is named after Monty Python."},\n    ]\n    \n    for step_num, step in enumerate(simulated_steps, 1):\n        print(f"Step {step_num}:")\n        if step["action"] == "tool_call":\n            tool_fn = TOOLS[step["tool"]]\n            result  = tool_fn(**step["args"])\n            print(f"  → Called {step[\'tool\']}({step[\'args\']})")\n            print(f"  ← Result: {result}")\n        elif step["action"] == "final_answer":\n            print(f"  ✅ Final answer: {step[\'text\']}")\n\nrun_agent("Who created Python and when?")',
      },
    ],
    keyTakeaways: [
      "The agent loop: think → call tool → observe result → think again → repeat until done.",
      "The LLM is the decision-maker — your code just executes what it decides.",
      "Always set a max_steps limit to prevent infinite loops.",
    ],
  },
  "ai-m5-t4": {
    topicId: "ai-m5-t4",
    intro: "ReAct (Reason + Act) is the standard pattern for building agents. The LLM alternates between Thought (reasoning about what to do), Action (calling a tool), and Observation (reading the result).",
    blocks: [
      {
        type: "practice",
        practiceLabel: "ReAct trace",
        practicePrompt: "Trace through a complete ReAct loop for a multi-step question.",
        starterCode: '# ReAct = Reason + Act\n# The LLM produces Thought → Action → Observation cycles\n\nreact_trace = [\n    {\n        "step": "Thought",\n        "content": "The user wants to know the weather in London and if it\'s good for a picnic. I should first get the weather."\n    },\n    {\n        "step": "Action",\n        "content": "get_weather(city=\'London\')"\n    },\n    {\n        "step": "Observation",\n        "content": "15°C, partly cloudy, 30% chance of rain"\n    },\n    {\n        "step": "Thought",\n        "content": "The weather is mild but there\'s a 30% rain chance. I have enough info to answer."\n    },\n    {\n        "step": "Final Answer",\n        "content": "London is 15°C with some clouds and a 30% chance of rain. It could work for a picnic but bring a jacket and maybe an umbrella!"\n    },\n]\n\nfor item in react_trace:\n    prefix = "→" if item["step"] == "Action" else "←" if item["step"] == "Observation" else "•"\n    print(f"{prefix} [{item[\'step\'].upper()}]")\n    print(f"  {item[\'content\']}")\n    print()',
      },
    ],
    keyTakeaways: [
      "ReAct alternates between Thought, Action, and Observation until the task is complete.",
      "The Thought step is crucial — it forces the model to reason before acting.",
      "ReAct agents are transparent: you can read their reasoning at each step.",
    ],
  },
};
