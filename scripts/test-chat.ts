
import { getRelevantContext } from "../src/lib/rag";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function testQuery(query: string) {
    console.log(`\n--- Testing Query: "${query}" ---`);
    const context = await getRelevantContext(query);
    console.log("Context Found:\n", context);

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        temperature: 0.2,
        messages: [
            {
                role: "system",
                content: `You are the Redpals Archivist AI. Answer ONLY using the provided context. If the answer is not found, say you do not know.`
            },
            {
                role: "user",
                content: `Context: ${context}\n\nQuestion: ${query}`
            }
        ]
    });

    console.log("\nAI Reply:\n", completion.choices[0].message.content);
}

// Test cases
async function main() {
    await testQuery("what are Zyko's traits?");
}

main();
