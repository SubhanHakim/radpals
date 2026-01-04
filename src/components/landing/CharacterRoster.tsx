import Image from "next/image";
import { getCharacters } from "@/lib/db";


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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {characters.map((char) => (
                        <div key={char.id} className="group relative bg-zinc-900/50 border border-zinc-800 overflow-hidden hover:border-[#ccff00]/50 transition-all duration-300">
                            <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                                <Image
                                    src={char.image_url}
                                    alt={char.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                                <div className="absolute top-4 left-4 flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${char.status === 'ACTIVE' ? 'bg-[#ccff00] animate-pulse' : 'bg-red-500'}`}></span>
                                    <span className="text-[10px] font-mono text-white bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm border border-zinc-700">
                                        {char.status}
                                    </span>
                                </div>
                            </div>

                            <div className="absolute bottom-0 w-full p-6">
                                <h3 className="text-2xl font-bold font-mono text-white mb-1 tracking-wider group-hover:text-[#ccff00] transition-colors">
                                    {char.name}
                                </h3>
                                <p className="text-xs text-zinc-400 font-mono uppercase tracking-widest mb-4 border-l-2 border-red-600 pl-2">
                                    {char.role}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {char.traits && char.traits.map((trait: string, idx: number) => (
                                        <span key={idx} className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-1 bg-black group-hover:border-[#ccff00]/30 transition-colors">
                                            {trait}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M0 0H20V20" stroke="#ccff00" strokeWidth="1" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
