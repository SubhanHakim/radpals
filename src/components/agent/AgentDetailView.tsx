"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { sfx } from "@/lib/sfx";

type Character = {
    id: number;
    name: string;
    role: string;
    bio: string;
    image_url: string;
    status: string;
    traits: string[];
    gallery?: string[];
};

export default function AgentDetailView({ character }: { character: Character }) {
    const isLocked = character.status === "LOCKED";

    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#ccff00] selection:text-black">

            {/* HERO SECTION */}
            <section className="relative h-screen w-full flex items-center overflow-hidden">
                {/* Background Graphics */}
                <div className="absolute inset-0 bg-[#050505]">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#ccff00]/5 rounded-full blur-[150px] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] mask-image-gradient"></div>
                </div>

                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-20">

                    {/* Left: Text Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-8"
                    >
                        {/* Status Brand */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 border border-zinc-800 rounded-full bg-zinc-900/50 backdrop-blur-md">
                            <span className={`w-2 h-2 rounded-full ${character.status === 'ACTIVE' ? 'bg-[#ccff00] animate-pulse' : 'bg-red-500'}`}></span>
                            <span className="text-zinc-400 font-mono text-xs tracking-widest uppercase">
                                STATUS: {character.status}
                            </span>
                        </div>

                        {/* Name & Title */}
                        <div>
                            <h1 className="text-6xl md:text-9xl font-black font-mono tracking-tighter text-white leading-none mb-2">
                                {character.name}
                            </h1>
                            <p className="text-2xl md:text-3xl font-mono text-[#ccff00] uppercase tracking-wider opacity-80">
                                {character.role}
                            </p>
                        </div>

                        {/* ID Hash */}
                        <div className="font-mono text-zinc-600 text-sm">
                            AGENT_ID: <span className="text-zinc-500">RP-{(Number(character.id) + 9900).toString(16).toUpperCase()}</span>
                        </div>

                        {/* Traits */}
                        <div className="flex flex-wrap gap-3 pt-4">
                            {character.traits && character.traits.map((trait, idx) => (
                                <span key={idx} className="px-4 py-2 border border-zinc-800 bg-zinc-900/30 text-zinc-300 font-mono text-xs uppercase tracking-wider hover:border-[#ccff00]/50 hover:text-[#ccff00] transition-colors cursor-crosshair">
                                    [ {trait} ]
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Character Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative h-[60vh] lg:h-[80vh] w-full"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80"></div>
                        <Image
                            src={character.image_url}
                            alt={character.name}
                            fill
                            className="object-contain object-bottom md:object-center drop-shadow-[0_0_50px_rgba(204,255,0,0.1)]"
                            priority
                        />
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.3em]">Scroll for Intel</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-[#ccff00] to-transparent"></div>
                </motion.div>
            </section>


            {/* LORE / BIO SECTION */}
            <section className="py-32 bg-zinc-950 relative border-t border-zinc-900 border-b border-zinc-900">
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <div className="mb-12 flex items-center justify-between border-b border-zinc-800 pb-4">
                        <h2 className="text-3xl md:text-5xl font-bold font-mono text-white tracking-tight">
                            DATA_LOG <span className="text-[#ccff00]">.01</span>
                        </h2>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccff00" strokeWidth="1" className="opacity-50">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="text-xl md:text-2xl leading-relaxed font-mono text-zinc-300">
                            {character.bio}
                        </p>
                    </div>
                </div>
            </section>


            {/* GALLERY SECTION */}
            {character.gallery && character.gallery.length > 0 && (
                <section className="py-32 bg-black relative">
                    <div className="max-w-7xl mx-auto px-4 mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold font-mono text-white tracking-tight text-center uppercase">
                            Visual Archives
                        </h2>
                        <div className="w-24 h-1 bg-[#ccff00] mx-auto mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                        {character.gallery.map((img, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="relative aspect-square group overflow-hidden bg-zinc-900 cursor-pointer"
                                onMouseEnter={() => sfx.hover()}
                                onClick={() => sfx.click()}
                            >
                                <Image
                                    src={img}
                                    alt={`Archive ${idx}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-[#ccff00]/0 group-hover:bg-[#ccff00]/10 transition-colors duration-300"></div>
                                <div className="absolute bottom-4 left-4 bg-black/80 px-2 py-1 text-[10px] text-[#ccff00] font-mono translate-y-full group-hover:translate-y-0 transition-transform">
                                    IMG_SEQ_{100 + idx}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Back Nav */}
            <div className="flex justify-center py-24 bg-black">
                <Link
                    href="/#agents"
                    className="group flex items-center gap-3 text-zinc-500 hover:text-white transition-colors"
                >
                    <span className="font-mono uppercase tracking-widest text-sm group-hover:translate-x-[-5px] transition-transform">
                        &lt; Return to Roster
                    </span>
                </Link>
            </div>

        </div>
    );
}
