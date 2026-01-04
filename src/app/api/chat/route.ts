import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getRelevantContext } from "@/lib/rag";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  const context = await getRelevantContext(message);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: ` You are the Redpals Archivist AI. Answer ONLY using the provided context. If the answer is not found, say you do not know.`
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