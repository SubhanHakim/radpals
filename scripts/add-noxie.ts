
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const noxie = {
    name: "NOXIE",
    role: "The Breakrunner",
    image_url: "/characters/noxie.png",
    bio: "In a world of cracked roads, Noxie creates paths where none exist. Modified for extreme mobility, she is the beginning and the exit for RADPALS operations.",
    status: "ACTIVE",
    traits: ["Fast", "Agile", "Pathfinder"],
};

async function main() {
    console.log("Adding NOXIE...");

    const { error } = await supabase.from("characters").insert(noxie);

    if (error) {
        console.error(`Error inserting NOXIE:`, error);
    } else {
        console.log(`Successfully added NOXIE.`);
    }
}

main();
