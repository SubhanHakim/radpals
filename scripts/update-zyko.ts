
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
    console.log("Updating ZYKO...");

    const { error } = await supabase
        .from("characters")
        .update({
            role: "Leader of the Radpals",
            bio: "A leader without a crown. Not elected—followed. In the noise of the network, he is the only clear signal."
        })
        .eq("name", "ZYKO");

    if (error) {
        console.error(`Error updating ZYKO:`, error);
    } else {
        console.log(`Successfully updated ZYKO.`);
    }
}

main();
