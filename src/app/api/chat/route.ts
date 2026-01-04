import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getRelevantContext } from "@/lib/rag";

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { message } = await req.json();

  const context = await getRelevantContext(message);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: ` You are the Redpals Archivist AI. Answer ONLY using the provided context. If the answer is not found, say you do not know. Use bullet points for lists.`
      },
      {
        role: "user",
        content: `Context: ${context}   

Question: ${message}`
      }
    ]
  });

  return NextResponse.json({
    reply: completion.choices[0].message.content
  });
}