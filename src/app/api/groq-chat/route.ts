import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "edge";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface RequestBody {
  apiKey: string;
  messages: ChatMessage[];
  model?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RequestBody;
    const { apiKey, messages, model = "llama3-70b-8192" } = body;

    if (!apiKey?.trim()) {
      return NextResponse.json({ error: "API key is required." }, { status: 400 });
    }
    if (!messages?.length) {
      return NextResponse.json({ error: "Messages are required." }, { status: 400 });
    }

    const groq = new Groq({ apiKey });

    const stream = await groq.chat.completions.create({
      model,
      messages,
      stream: true,
      max_tokens: 1024,
      temperature: 0.7,
    });

    // Stream the response back as Server-Sent Events
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content ?? "";
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Stream error";
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    // Groq returns authentication errors as a specific message
    if (message.toLowerCase().includes("api key") || message.toLowerCase().includes("auth")) {
      return NextResponse.json({ error: "Invalid API key. Check your Groq API key and try again." }, { status: 401 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
