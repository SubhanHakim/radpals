import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getRelevantContext(query: string) {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query
  });

  const { data } = await supabase.rpc("match_documents", {
    query_embedding: embedding.data[0].embedding,
    match_threshold: 0.5,
    match_count: 3
  });

  return data?.map((d: { content: string }) => d.content).join("\n") ?? "";
}
