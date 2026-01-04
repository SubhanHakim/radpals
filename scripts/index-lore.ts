import fs from "fs";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const documents = [
    {
        source_id: "lore:redpals",
        path: "data/lore.md",
    },
    {
        source_id: "character:zyko",
        path: "data/characters/zyko.md",
    },
];

async function main() {
    for (const doc of documents) {
        const content = fs.readFileSync(doc.path, "utf-8");

        const embedding = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: content,
        });

        const { error } = await supabase.from("documents").upsert({
            source_id: doc.source_id,
            content,
            embedding: embedding.data[0].embedding,
        });

        if (error) {
            console.error(`Error indexing ${doc.source_id}:`, error);
        } else {
            console.log(`Indexed: ${doc.source_id}`);
        }
    }
}

main().catch(console.error);
