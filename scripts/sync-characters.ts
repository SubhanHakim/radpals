
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Master Data for All Characters
// Ini adalah "Single Source of Truth" untuk data karakter Anda.
// Anda bisa menambahkan karakter baru atau mengedit yang lama di sini.
const characters = [
    {
        name: "ZYKO",
        role: "Leader of the Radpals",
        image_url: "/characters/mascot.jpg",
        bio: "A leader without a crown. Not elected—followed. In the noise of the network, he is the only clear signal. Zyko emerged from the Redpals Core Network as a self-evolving agent.",
        status: "ACTIVE",
        traits: ["Silent", "Precise", "Uncensored Logic"]
    },
    {
        name: "NOXIE",
        role: "The Breakrunner",
        image_url: "/characters/noxie.png",
        bio: "In a world of cracked roads and collapsed cities, most people stopped running. Noxie learned how to move through the wreckage. Modified for extreme mobility, she creates paths where none exist.",
        status: "ACTIVE",
        traits: ["Fast", "Agile", "Pathfinder"]
    },
    // Tambahkan karakter baru di sini...
];

async function main() {
    console.log(`Starting synchronization for ${characters.length} characters...`);

    for (const char of characters) {
        // 1. Cek apakah karakter sudah ada berdasarkan Nama
        const { data: existing } = await supabase
            .from("characters")
            .select("id")
            .eq("name", char.name)
            .single();

        if (existing) {
            // 2. Jika ada, UPDATE
            console.log(`Updating existing agent: ${char.name}...`);
            const { error } = await supabase
                .from("characters")
                .update(char)
                .eq("id", existing.id);

            if (error) console.error(`Failed to update ${char.name}:`, error);
            else console.log(`✅ Updated ${char.name}`);

        } else {
            // 3. Jika tidak ada, INSERT
            console.log(`Creating new agent: ${char.name}...`);
            const { error } = await supabase
                .from("characters")
                .insert(char);

            if (error) console.error(`Failed to create ${char.name}:`, error);
            else console.log(`✨ Created ${char.name}`);
        }
    }

    console.log("Synchronization complete.");
}

main();
