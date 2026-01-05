
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });
// Note: Ensure you run this script with environment variables loaded, e.g.:
// export $(cat .env.local | xargs) && npx tsx scripts/update-zyko-structured.ts
// OR if using a specific runner.

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateZyko() {
    console.log("Updating ZYKO data...");

    const updates = {
        twitter: "https://x.com/Zyko_world",
        pump_contract: "3ASc2nQbyLRcgDmFMW8bkzzm153KcovTYsg5cJTPpump"
    };

    const { data, error } = await supabase
        .from("characters")
        .update(updates)
        .eq("name", "ZYKO")
        .select();

    if (error) {
        console.error("Error updating ZYKO:", error);
        console.log("\nPossible Fix: Ensure the 'twitter' and 'pump_contract' columns exist in your 'characters' table.");
    } else {
        console.log("Successfully updated ZYKO:", data);
    }
}

updateZyko();
