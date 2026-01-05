import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const noxie = {
    name: "NOXIE",
    role: "Breakrunner",
    image_url: "/characters/noxie.png",
    bio: "In a world of cracked roads, Noxie creates paths where none exist. Modified for extreme mobility, she is the beginning and the exit for RADPALS operations.",
    status: "ACTIVE",
    traits: ["Fast", "Agile", "Pathfinder"],
    twitter: "https://x.com/Noxie_world",
    pump_contract: "#"
};

async function main() {
    console.log("Updating NOXIE...");

    // Using upsert to either insert or update if exists (assuming name is unique/pk or we just match)
    // Actually, update is safer if we know it exists. The user said "update".

    const { data, error } = await supabase
        .from("characters")
        .update(noxie)
        .eq("name", "NOXIE")
        .select();

    if (error) {
        console.error(`Error updating NOXIE:`, error);
    } else {
        if (data.length === 0) {
            // If no data returned, maybe it doesn't exist? Try handling that or just log it.
            // If it doesn't exist, we might want to insert.
            console.log("Noxie not found, attempting insert...");
            const { error: insertError } = await supabase.from("characters").insert(noxie);
            if (insertError) console.error("Error inserting NOXIE:", insertError);
            else console.log("Successfully inserted NOXIE.");
        } else {
            console.log(`Successfully updated NOXIE:`, data);
        }
    }
}

main();
