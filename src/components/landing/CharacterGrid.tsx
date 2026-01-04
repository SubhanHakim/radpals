"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { sfx } from "@/lib/sfx";

type Character = {
    id: number;
    name: string;
    role: string;
    image_url: string;
    status: string;
    traits: string[];
};

export default function CharacterGrid({ characters }: { characters: Character[] }) {
    if (!characters || characters.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {characters.map((char, index) => (
                <motion.div
                    key={char.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group relative bg-zinc-900/50 border border-zinc-800 overflow-hidden hover:border-[#ccff00]/50 transition-all duration-300"
                    onMouseEnter={() => sfx.hover()}
                    onClick={() => sfx.click()}
                >
                    <Link href={`/agent/${char.name.toLowerCase()}`} className="block h-full cursor-pointer">
                        {/* Image Container */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                            <Image
                                src={char.image_url}
                                alt={char.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                            {/* Status Indicator */}
                            <div className="absolute top-4 left-4 flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${char.status === 'ACTIVE' ? 'bg-[#ccff00] animate-pulse' : 'bg-red-500'}`}></span>
                                <span className="text-[10px] font-mono text-white bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm border border-zinc-700">
                                    {char.status}
                                </span>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="absolute bottom-0 w-full p-6">
                            <h3 className="text-2xl font-bold font-mono text-white mb-1 tracking-wider group-hover:text-[#ccff00] transition-colors">
                                {char.name}
                            </h3>
                            <p className="text-xs text-zinc-400 font-mono uppercase tracking-widest mb-4 border-l-2 border-red-600 pl-2">
                                {char.role}
                            </p>

                            {/* Traits */}
                            <div className="flex flex-wrap gap-2">
                                {char.traits && char.traits.map((trait: string, idx: number) => (
                                    <span key={idx} className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-1 bg-black group-hover:border-[#ccff00]/30 transition-colors">
                                        {trait}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Decorative Corner */}
                        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M0 0H20V20" stroke="#ccff00" strokeWidth="1" />
                            </svg>
                        </div>
                    </Link>
                </motion.div>
            ))}

            {/* Coming Soon / Locked Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="group relative bg-zinc-950/30 border border-zinc-800/50 overflow-hidden hover:border-red-500/30 transition-all duration-300 cursor-not-allowed"
                onMouseEnter={() => sfx.error()}
                onClick={() => sfx.error()}
            >
                {/* Image Container with Noise */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-black flex items-center justify-center">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#111_10px,#111_20px)] opacity-50"></div>
                    <div className="absolute inset-0 animate-pulse bg-red-900/5"></div>

                    {/* Lock Icon */}
                    <div className="relative z-10 p-4 border border-zinc-800 rounded-full bg-zinc-900/50 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600 group-hover:text-red-500 transition-colors">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>

                    {/* Status Indicator */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-900"></span>
                        <span className="text-[10px] font-mono text-zinc-600 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm border border-zinc-800">
                            OFFLINE
                        </span>
                    </div>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 w-full p-6 text-center md:text-left">
                    <h3 className="text-2xl font-bold font-mono text-zinc-700 mb-1 tracking-wider group-hover:text-red-900 transition-colors">
                        CLASSIFIED
                    </h3>
                    <p className="text-xs text-zinc-800 font-mono uppercase tracking-widest mb-4 border-l-2 border-zinc-800 pl-2 group-hover:border-red-900/30 transition-colors">
                        UNKNOWN SIGNAL
                    </p>

                    {/* Traits */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start opacity-30">
                        {["???", "???", "???"].map((trait, idx) => (
                            <span key={idx} className="text-[10px] text-zinc-700 border border-zinc-900 px-2 py-1 bg-black">
                                {trait}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
