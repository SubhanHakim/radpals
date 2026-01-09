import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const gearboi = {
    name: "GEARBOI",
    role: "Ironhand Punk",
    image_url: "/characters/gearboi/Untitled_Artwork.png",
    bio: "When RADPALS tear down the old structures, GEARBOI makes sure they keep moving. He is RADPALS’ weapons mechanic. Every tool of combat is born from his makeshift workshop. What the old world discards, GEARBOI turns into functional weapons. His mask is always on, not out of fear of being recognized, but because RADPALS don’t need faces—they need action. In the post-collapse world, every gear that keeps turning is a form of resistance. And as long as GEARBOI is still working, RADPALS will never run out of tools to fight back.",
    status: "ACTIVE",
    traits: ["Mechanic", "Ironhand", "Resourceful"],
    twitter: "#",
    pump_contract: "#",
    gallery: [
        "/characters/gearboi/Untitled_Artwork.png",
        "/characters/gearboi/IMG_2692.JPG",
        "/characters/gearboi/Whisk_748e057d76b3641aedf426626338a0dadr.png",
        "/characters/gearboi/Whisk_a184ccc07db3388a5ee4ff5d8a0c0574dr.png",
        "/characters/gearboi/Whisk_a695aa62303e5b2a3bb4b537e4256344dr.png"
    ]
};

async function main() {
    console.log("Updating GEARBOI...");

    const { data, error } = await supabase
        .from("characters")
        .update(gearboi)
        .eq("name", "GEARBOI")
        .select();

    if (error) {
        console.error(`Error updating GEARBOI:`, error);
    } else {
        if (data.length === 0) {
            console.log("GEARBOI not found, attempting insert...");
            const { error: insertError } = await supabase.from("characters").insert(gearboi);
            if (insertError) console.error("Error inserting GEARBOI:", insertError);
            else console.log("Successfully inserted GEARBOI.");
        } else {
            console.log(`Successfully updated GEARBOI:`, data);
        }
    }
}

main();
