
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Format rapi seperti Noxie
const zyko = {
    name: "ZYKO",
    role: "Leader of the Radpals",
    image_url: "/characters/mascot.jpg", // Pastikan path image ini benar
    bio: "A leader without a crown. Not elected—followed. In the noise of the network, he is the only clear signal.",
    status: "ACTIVE",
    traits: ["Silent", "Precise", "Uncensored Logic"],
};

async function main() {
    console.log("Upserting ZYKO data...");

    // Menggunakan 'upsert' (Update if exists, Insert if new)
    // Syarat: Kolom 'name' harus unik di database, atau kita harus punya ID. 
    // Kita coba match berdasarkan 'name'.
    const { error } = await supabase
        .from("characters")
        .upsert(zyko, { onConflict: "name" });

    if (error) {
        console.error(`Error upserting ZYKO:`, error);
    } else {
        console.log(`Successfully processed ZYKO.`);
    }
}

main();
