
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const characters = [
    {
        name: "ZYKO",
        role: "Autonomous Courier",
        image_url: "/characters/mascot.jpg",
        bio: "Emerging from the ruins of the old net, Zyko delivers data packages that others fear to touch.",
        status: "ACTIVE",
        traits: ["Silent", "Precise", "Uncensored"],
    }
];

async function main() {
    console.log("Seeding characters...");

    for (const char of characters) {
        // We use upsert on 'name' if we made it unique, but likely it's not unique constraint yet.
        // Let's just try insert.
        const { error } = await supabase.from("characters").insert(char);

        if (error) {
            console.error(`Error inserting ${char.name}:`, error);
        } else {
            console.log(`Inserted ${char.name}`);
        }
    }
}

main();
