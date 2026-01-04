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

export async function getCharacterById(id: string) {
    const { data, error } = await supabase
        .from("characters")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error(`Error fetching character ${id}:`, error);
        return null;
    }

    return data;
}

export async function getCharacterBySlug(slug: string) {
    // Assuming names in DB are uppercase (e.g. ZYKO, NOXIE)
    // We try to match by name locally or just uppercase the slug.
    const nameToQuery = slug.toUpperCase();

    const { data, error } = await supabase
        .from("characters")
        .select("*")
        .eq("name", nameToQuery)
        .single();

    // Fallback removed for security: strict name lookup only.
    if (error || !data) {
        return null;
    }

    return data;
}
