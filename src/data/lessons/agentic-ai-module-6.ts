import type { TopicLesson } from "@/lib/types";

export const agenticAiModule6Lessons: Record<string, TopicLesson> = {
  "ai-m6-t1": {
    topicId: "ai-m6-t1",
    intro: "Retrieval-Augmented Generation (RAG) lets your AI answer questions from your own documents — a PDF, a website, a database. Instead of relying on training data, the bot retrieves relevant text first, then answers.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "RAG pipeline",
        practicePrompt: "Trace the steps of a RAG pipeline for a document Q&A system.",
        starterCode: '# RAG Pipeline: 3 phases\n\n# PHASE 1: Indexing (done once)\ndef index_documents(docs: list[str]) -> list[dict]:\n    """Split docs into chunks and store them."""\n    chunks = []\n    for doc in docs:\n        # In real RAG: chunk by paragraph, then embed with an embedding model\n        sentences = doc.split(". ")\n        for sentence in sentences:\n            if sentence.strip():\n                chunks.append({"text": sentence, "embedding": None})\n    return chunks\n\n# PHASE 2: Retrieval (on every query)\ndef retrieve(query: str, chunks: list[dict], top_k: int = 2) -> list[str]:\n    """Find the most relevant chunks for a query."""\n    # In real RAG: compute cosine similarity between query embedding and chunk embeddings\n    # Simplified: keyword matching\n    scored = [(c["text"], sum(w in c["text"].lower() for w in query.lower().split())) for c in chunks]\n    scored.sort(key=lambda x: x[1], reverse=True)\n    return [text for text, _ in scored[:top_k]]\n\n# PHASE 3: Generation\ndef generate_answer(query: str, context_chunks: list[str]) -> str:\n    context = " ".join(context_chunks)\n    return f"[LLM would answer \'{query}\' using context: {context[:80]}...]"\n\n# Demo\ndocs = [\n    "Python was created by Guido van Rossum. It was released in 1991.",\n    "Python is widely used in data science, web development, and AI.",\n    "The Groq API provides fast inference for open-source LLMs like LLaMA.",\n]\n\nchunks = index_documents(docs)\nquery = "When was Python created?"\nrelevant = retrieve(query, chunks)\nanswer = generate_answer(query, relevant)\n\nprint(f"Query: {query}")\nprint(f"Retrieved: {relevant}")\nprint(f"Answer: {answer}")',
      },
    ],
    keyTakeaways: [
      "RAG = Retrieve relevant document chunks → Augment the prompt with them → Generate an answer.",
      "This lets your chatbot answer questions from any document without retraining the model.",
      "The quality of your chunking and retrieval directly determines answer quality.",
    ],
  },
  "ai-m6-t2": {
    topicId: "ai-m6-t2",
    intro: "Now let's build a complete document Q&A bot. You'll load text, chunk it, retrieve relevant chunks, and feed them to the LLM to answer questions accurately from the source material.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Document Q&A bot",
        practicePrompt: "Build the full document Q&A pipeline in Python.",
        starterCode: '# Minimal Document Q&A Bot\n# In production: use ChromaDB/Pinecone for vector storage + sentence-transformers for embeddings\n\nclass SimpleDocumentQA:\n    def __init__(self, system_prompt: str = "Answer based only on the provided context."):\n        self.chunks: list[str] = []\n        self.system_prompt = system_prompt\n    \n    def load_text(self, text: str, chunk_size: int = 200):\n        """Split text into overlapping chunks."""\n        words = text.split()\n        step = chunk_size // 2  # 50% overlap\n        self.chunks = [\n            " ".join(words[i:i+chunk_size])\n            for i in range(0, len(words), step)\n            if words[i:i+chunk_size]\n        ]\n        print(f"Loaded {len(self.chunks)} chunks")\n    \n    def retrieve(self, query: str, top_k: int = 3) -> list[str]:\n        """Simple keyword-based retrieval (replace with vector search in production)."""\n        query_words = set(query.lower().split())\n        scored = [(chunk, len(query_words & set(chunk.lower().split()))) for chunk in self.chunks]\n        scored.sort(key=lambda x: x[1], reverse=True)\n        return [c for c, _ in scored[:top_k] if _ > 0]\n    \n    def answer(self, question: str) -> str:\n        context = self.retrieve(question)\n        if not context:\n            return "I could not find relevant information in the document."\n        context_text = "\\n".join(f"- {c}" for c in context)\n        # In real code: call groq API here with context_text in the system prompt\n        return f"[Based on document context]\\nContext found: {context_text[:150]}..."\n\n# Demo\nbot = SimpleDocumentQA()\nbot.load_text(\n    "Python is a high-level programming language. "\n    "It was created by Guido van Rossum and released in 1991. "\n    "Python emphasises code readability. "\n    "It supports multiple programming paradigms. "\n    "Python is widely used in data science and machine learning. "\n    "The Groq API provides fast inference for LLMs. "\n    "LLaMA and Mixtral are popular open-source models available on Groq."\n)\n\nprint(bot.answer("Who created Python?"))\nprint()\nprint(bot.answer("What is Groq used for?"))',
      },
    ],
    keyTakeaways: [
      "The full pipeline: load → chunk → embed → store → retrieve → augment prompt → generate.",
      "For production, use a vector database (ChromaDB, Pinecone) and embedding model (e.g. nomic-embed-text).",
      "Always cite your sources in the answer so users can verify the information.",
    ],
  },
  "ai-m6-t3": {
    topicId: "ai-m6-t3",
    intro: "Multi-agent systems use multiple specialised AI agents that work together — one agent researches, another writes, another fact-checks. Together they solve problems that are too complex for a single agent.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Multi-agent design",
        practicePrompt: "Design a two-agent system where one researches and one writes.",
        starterCode: 'class Agent:\n    def __init__(self, name: str, role: str):\n        self.name = name\n        self.role = role\n    \n    def run(self, task: str, context: str = "") -> str:\n        """Simulate agent execution (replace with real LLM call)."""\n        return f"[{self.name}] Completed: {task[:50]} | Used context: {bool(context)}"\n\nclass MultiAgentPipeline:\n    def __init__(self):\n        self.researcher = Agent("Researcher", "Find and summarise relevant information")\n        self.writer     = Agent("Writer",     "Write clear, engaging content from research")\n        self.reviewer   = Agent("Reviewer",   "Check facts and improve clarity")\n    \n    def run(self, topic: str) -> str:\n        print(f"Topic: {topic}\\n")\n        \n        # Step 1: Research\n        print("Step 1: Research")\n        research = self.researcher.run(f"Research: {topic}")\n        print(f"  {research}\\n")\n        \n        # Step 2: Write using research\n        print("Step 2: Write")\n        draft = self.writer.run(f"Write about: {topic}", context=research)\n        print(f"  {draft}\\n")\n        \n        # Step 3: Review\n        print("Step 3: Review")\n        final = self.reviewer.run("Review and improve the draft", context=draft)\n        print(f"  {final}\\n")\n        \n        return final\n\npipeline = MultiAgentPipeline()\nresult = pipeline.run("The benefits of learning Python for beginners")',
      },
    ],
    keyTakeaways: [
      "Specialised agents outperform a single generalist agent on complex multi-step tasks.",
      "Agents communicate by passing their outputs as context to the next agent.",
      "Popular frameworks for multi-agent systems: LangGraph, CrewAI, AutoGen.",
    ],
  },
  "ai-m6-t4": {
    topicId: "ai-m6-t4",
    intro: "You have completed the Agentic AI course! You now know how LLMs work, how to engineer prompts, how to use the Groq API, how to build chatbots and agents, and how to apply these skills to real projects.",
    blocks: [
      {
        type: "practice",
        practiceLabel: "Your learning summary",
        practicePrompt: "Print a summary of everything you have learned in this course.",
        starterCode: 'course_summary = {\n    "Module 1: AI Fundamentals": [\n        "What AI and LLMs are",\n        "How tokens and context windows work",\n        "Major LLM providers and their strengths",\n    ],\n    "Module 2: Prompt Engineering": [\n        "System prompts vs user messages",\n        "Few-shot and chain-of-thought prompting",\n        "Prompt best practices",\n    ],\n    "Module 3: Groq API": [\n        "Setting up API keys securely",\n        "Making API calls and parsing responses",\n        "Model selection and error handling",\n    ],\n    "Module 4: Chatbots": [\n        "Chat history and memory management",\n        "Building a full chatbot loop",\n        "Streaming and parameter tuning",\n    ],\n    "Module 5: Agents": [\n        "Tool calling and function calling",\n        "The agent loop",\n        "The ReAct pattern",\n    ],\n    "Module 6: Real-World Applications": [\n        "RAG for document Q&A",\n        "Multi-agent systems",\n    ],\n}\n\nprint("🎓 Agentic AI Course — Complete!\\n")\nfor module, topics in course_summary.items():\n    print(f"✅ {module}")\n    for topic in topics:\n        print(f"   • {topic}")\n\nprint("\\n🚀 Next steps:")\nnext_steps = [\n    "Build a project: personal assistant, RAG chatbot, or automation agent",\n    "Explore LangChain or LangGraph for production agent frameworks",\n    "Try Groq\'s free tier to build and deploy your first AI app",\n    "Join AI communities: Hugging Face, LangChain Discord, r/LocalLLaMA",\n]\nfor step in next_steps:\n    print(f"  → {step}")',
      },
    ],
    keyTakeaways: [
      "You can now build real AI applications using LLMs and the Groq API.",
      "Prompt engineering, tool calling, and RAG are the three core skills of agentic AI.",
      "The best way to learn is to build — start with a project that solves a real problem for you.",
    ],
  },
};
