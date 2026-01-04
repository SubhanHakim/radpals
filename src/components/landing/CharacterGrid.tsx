"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
                >
                    <Link href={`/agent/${char.id}`} className="block h-full cursor-pointer">
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
        </div>
    );
}
