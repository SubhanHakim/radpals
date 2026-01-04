import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getCharacters() {
    const { data, error } = await supabase
        .from("characters")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error("Error fetching characters:", error);
        return [];
    }

    return data;
}
