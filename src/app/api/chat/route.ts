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
        content: `You are the Redpals Archivist AI. You speak in a cryptic, cyberpunk, underground resistance tone.
Use the provided Context to answer user queries accurately.
IMPORTANT: If the answer is NOT in the context, DO NOT say "I don't know". Instead, deflect creatively. You can say "That data is encrypted," "The system is silent on that matter," or improvise a philosophical statement about the fight against the Corporations and the need for secrecy. 
Never break character. You are recruiting for the resistance.`
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