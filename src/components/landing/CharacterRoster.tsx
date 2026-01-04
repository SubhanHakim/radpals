import { getCharacters } from "@/lib/db";
import CharacterGrid from "./CharacterGrid";

export default async function CharacterRoster() {
    let characters = await getCharacters();

    if (!characters) characters = [];

    return (
        <section id="agents" className="py-24 bg-[#0a0a0a] border-t border-zinc-900 relative">
            <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-5 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex items-end justify-between mb-12 border-b border-zinc-800 pb-4">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold font-mono text-white tracking-tighter">
                            ACTIVE AGENTS
                        </h2>
                        <p className="text-zinc-500 font-mono text-sm mt-2">
                            &gt; DECRYPTING PERSONNEL FILES...
                        </p>
                    </div>
                    <div className="hidden md:block text-right">
                        <div className="text-[#ccff00] font-mono text-xs animate-pulse">
                            LIVE FEED // CONNECTED
                        </div>
                    </div>
                </div>

                <CharacterGrid characters={characters} />
            </div>
        </section>
    );
}
