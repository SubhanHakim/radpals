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
    twitter?: string;
    pump_contract?: string;
};

export default function AgentDetailView({ character }: { character: Character }) {
    const isLocked = character.status === "LOCKED";

    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#ccff00] selection:text-black">

            {/* HERO SECTION */}
            {/* HERO SECTION - RESTRUCTURED */}
            <section className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-12 px-4 lg:px-12 overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[#050505] -z-10">
                    <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-zinc-900/20 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
                </div>

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* LEFT COLUMN: TYPOGRAPHY & ACTIONS */}
                    <div className="space-y-10 relative z-10 order-2 lg:order-1">

                        {/* Top Badge */}
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ccff00] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ccff00]"></span>
                            </span>
                            <span className="text-zinc-400 font-mono text-[10px] tracking-[0.2em] uppercase">
                                IDENTITY_CONFIRMED // STORY_MODE
                            </span>
                        </div>

                        {/* Title Block */}
                        <div>
                            <h1 className="text-6xl lg:text-8xl font-black font-mono tracking-tighter text-white leading-[0.9]">
                                <div className="mb-2">{character.name},</div>
                                <div className="text-[#ccff00] text-5xl lg:text-7xl">
                                    {character.role}
                                </div>
                            </h1>
                        </div>

                        {/* Description with Vertical Line */}
                        <div className="border-l-2 border-zinc-800 pl-8 py-2">
                            <p className="text-xl md:text-2xl text-zinc-400 font-mono leading-relaxed line-clamp-3">
                                {character.bio.split('.')[0]}. A leader without a crown. Not elected—followed. In the noise of the network, he is the only clear signal.
                            </p>

                            {/* Mini Specs */}
                            <div className="flex gap-4 mt-6">
                                <div className="px-3 py-1 bg-zinc-900 rounded text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                                    SENTIENCE: <span className="text-zinc-300">HIGH</span>
                                </div>
                                <div className="px-3 py-1 bg-zinc-900 rounded text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                                    ORIGIN: <span className="text-zinc-300">UNKNOWN</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons Row */}
                        <div className="flex flex-wrap items-center gap-6 pt-4">

                            {/* X Button (Global) */}
                            <a
                                href={character.twitter || "https://twitter.com/radpals_ai"}
                                target="_blank"
                                className="w-16 h-16 flex items-center justify-center bg-white hover:bg-zinc-200 text-black border-2 border-transparent transition-all hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(30,30,30,1)]"
                                onMouseEnter={() => sfx.hover()}
                                onClick={() => sfx.click()}
                            >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                            </a>

                            {/* Pump.fun Button (Character Specific) */}
                            <a
                                href={character.pump_contract ? `https://pump.fun/${character.pump_contract}` : `https://pump.fun/${character.name.toLowerCase()}`}
                                target="_blank"
                                className="w-16 h-16 flex items-center justify-center bg-[#ccff00] hover:bg-[#b3e600] text-black border-2 border-transparent transition-all hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
                                onMouseEnter={() => sfx.hover()}
                                onClick={() => sfx.click()}
                            >
                                {/* Pill Icon */}
                                {/* Dexscreener Icon */}
                                <svg width="32" height="32" viewBox="0 0 389 389" className="text-black fill-current">
                                    <g transform="translate(0,389) scale(0.1,-0.1)">
                                        <path d="M2539 3840 c-90 -8 -231 -51 -321 -96 -29 -14 -91 -51 -138 -82 -111 -73 -385 -347 -796 -797 -171 -187 -431 -470 -578 -630 -298 -322 -397 -446 -455 -568 -83 -175 -116 -339 -108 -551 5 -163 20 -238 76 -382 106 -275 358 -532 621 -633 266 -103 610 -91 866 28 200 94 310 199 990 948 164 181 380 416 479 523 244 263 360 393 413 465 60 80 137 243 162 341 27 104 41 316 29 447 -38 441 -364 837 -791 961 -96 28 -305 40 -449 26z m349 -175 c230 -55 435 -195 556 -380 111 -169 155 -309 163 -512 7 -156 -7 -263 -48 -388 -47 -142 -92 -206 -287 -413 -137 -146 -466 -500 -558 -601 -15 -17 -78 40 -568 514 -188 182 -435 421 -551 532 -115 110 -221 212 -234 227 l-24 25 99 108 c371 401 586 627 652 686 125 110 298 188 478 217 76 12 241 4 322 -15z m-1609 -1237 c36 -34 280 -267 541 -518 261 -250 492 -471 513 -489 20 -19 37 -37 37 -41 0 -8 -117 -136 -315 -345 -83 -88 -187 -198 -230 -245 -176 -187 -289 -266 -450 -312 -105 -30 -333 -32 -434 -5 -260 71 -486 246 -582 451 -71 153 -50 462 46 665 53 111 114 190 280 361 82 86 233 242 334 348 101 105 186 192 189 192 2 0 34 -28 71 -62z" />
                                    </g>
                                </svg>
                            </a>

                            {/* Meta Data */}
                            <div className="font-mono text-[10px] text-zinc-500 tracking-widest space-x-4 ml-2">
                                <span>[ EST: 2025 ]</span>
                                <span>[ MOOD: {character.name} ]</span>
                            </div>
                        </div>

                    </div>


                    {/* RIGHT COLUMN: CARD UI */}
                    <div className="relative order-1 lg:order-2">
                        {/* Card Header Label */}
                        <div className="flex justify-between items-end mb-4 px-2">
                            <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                                ENTITY IDENTIFIER
                            </div>
                            <div className="text-white font-mono text-2xl font-bold tracking-tighter">
                                RP-{character.name.substring(0, 2)}-{(Number(character.id) + 10).toString(16).toUpperCase()}
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#ccff00]"></div>
                                <span className="text-zinc-500 font-mono text-[10px]">v.0.9.1</span>
                            </div>
                        </div>

                        {/* The Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-zinc-900 border border-zinc-800 p-2 pb-0 rounded-sm relative group overflow-hidden shadow-2xl"
                        >
                            {/* Image Area */}
                            <div className="relative aspect-square w-full bg-[#050505] overflow-hidden border-b-4 border-white mb-0">
                                <Image
                                    src={character.image_url}
                                    alt={character.name}
                                    fill
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                                {/* Overlay status bar inside image like reference */}
                                <div className="absolute bottom-6 left-0 right-0 px-6">
                                    <div className="bg-white/90 backdrop-blur-md p-3 flex justify-between items-center rounded-sm">
                                        <div className="text-black font-mono text-xs font-bold uppercase tracking-wider">
                                            STATE: <span className="text-zinc-600">{character.status}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-4 bg-[#ccff00]"></div>
                                            <div className="w-1.5 h-4 bg-[#ccff00]"></div>
                                            <div className="w-1.5 h-4 bg-[#ccff00]"></div>
                                            <div className="w-1.5 h-4 bg-zinc-300"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer Stripe */}
                            <div className="h-10 bg-zinc-950 flex items-center justify-between px-4">
                                <div className="text-zinc-600 font-mono text-[10px] uppercase">
                                    CONSCIOUSNESS_LEVEL
                                </div>
                                <div className="text-[#ccff00] font-mono text-[10px]">
                                    99.9%
                                </div>
                            </div>
                        </motion.div>

                        {/* Background decorative corners */}
                        <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-zinc-700"></div>
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-zinc-700"></div>
                    </div>

                </div>
            </section>


            {/* MARQUEE STRIP */}
            <div className="w-full bg-[#ccff00] border-y border-[#ccff00] overflow-hidden py-2 relative z-20">
                <style jsx>{`
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee-infinite {
                        animation: marquee 20s linear infinite;
                    }
                `}</style>
                <div className="flex whitespace-nowrap overflow-hidden w-full">
                    <div className="flex animate-marquee-infinite">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center mx-4 gap-4">
                                <span className="text-black font-black font-mono text-xl md:text-2xl tracking-widest uppercase">
                                    {character.name}
                                </span>
                                <span className="text-black/40 font-bold font-mono text-xl md:text-2xl">+++</span>
                                <span className="text-black font-bold font-mono text-xl md:text-2xl tracking-widest uppercase">
                                    {character.role}
                                </span>
                                <span className="text-black/40 font-bold font-mono text-xl md:text-2xl">+++</span>
                                {character.traits.map((trait, tIdx) => (
                                    <div key={tIdx} className="flex items-center gap-4">
                                        <span className="text-black font-bold font-mono text-xl md:text-2xl tracking-widest uppercase">
                                            {trait}
                                        </span>
                                        <span className="text-black/40 font-bold font-mono text-xl md:text-2xl">+++</span>
                                    </div>
                                ))}
                                <span className="text-black font-black font-mono text-xl md:text-2xl tracking-widest uppercase">
                                    DIGITAL RESISTANCE
                                </span>
                                <span className="text-black/40 font-bold font-mono text-xl md:text-2xl">+++</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* LORE / BIO SECTION - REDESIGNED */}
            <section className="py-24 lg:py-32 bg-zinc-950/50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                        {/* LEFT: VISUAL CARD */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="sticky top-24"
                        >
                            <div className="border border-zinc-800 bg-zinc-900/50 p-3 pb-0 rounded-sm relative shadow-2xl group">
                                {/* Decor */}
                                <div className="absolute top-4 left-4 z-20 text-white font-black text-4xl uppercase opacity-20 group-hover:opacity-50 transition-opacity">
                                    {character.name}
                                </div>

                                {/* Image Container */}
                                <div className="relative aspect-[4/5] w-full bg-[#050505] overflow-hidden border-b-4 border-white">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ccff00_0%,transparent_70%)] opacity-5"></div>
                                    <Image
                                        src={character.gallery && character.gallery.length > 1 ? character.gallery[1] : character.image_url}
                                        alt={`${character.name} Alternate`}
                                        fill
                                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Lightning overlay effect */}
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                                </div>

                                {/* Footer Strip */}
                                <div className="h-12 bg-white flex items-center justify-between px-4 mt-0">
                                    <span className="text-black font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                                        SCANNING COMPLETE
                                    </span>
                                    <span className="text-[#00aa00] font-mono text-[10px] font-bold">
                                        100% MATCH
                                    </span>
                                </div>

                                {/* Shadow Block behind */}
                                <div className="absolute -z-10 top-4 left-4 w-full h-full bg-zinc-900 border border-zinc-800 rounded-sm"></div>
                            </div>
                        </motion.div>


                        {/* RIGHT: CONTENT */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-10 pt-4"
                        >
                            {/* Tag */}
                            <div className="inline-block px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded text-[#ccff00] font-mono text-xs tracking-widest uppercase">
                                // ABOUT_PROTOCOL
                            </div>

                            {/* Headline */}
                            <h2 className="text-5xl lg:text-7xl font-black font-mono tracking-tighter text-white leading-[0.9]">
                                DIRECTION IN <br />
                                <span className="text-[#ccff00]">CHAOS</span>
                            </h2>

                            {/* Sub-headline */}
                            <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight">
                                To RADPALS, <span className="text-[#ccff00]">{character.name}</span> is more than a {character.role}. He is direction.
                            </h3>

                            {/* Main Text */}
                            <div className="prose prose-invert prose-lg text-zinc-400 font-mono leading-relaxed">
                                <p>
                                    {character.bio}
                                </p>
                                <p className="mt-6">
                                    In this universe, every decision has consequences. Every character carries an ideology. Every move shifts the fragile balance of a dying world.
                                </p>
                            </div>

                            {/* Quote Block */}
                            <div className="border-l-4 border-[#ccff00] pl-6 py-2 bg-gradient-to-r from-[#ccff00]/5 to-transparent">
                                <p className="text-lg lg:text-xl font-bold font-mono text-white leading-relaxed">
                                    RADPALS is not about saving the world. It's about breaking it—so something fairer can rise from the ashes.
                                </p>
                            </div>

                        </motion.div>

                    </div>
                </div>
            </section>


            {/* GALLERY SECTION - REDESIGNED */}
            {character.gallery && character.gallery.length > 0 && (
                <section className="py-32 bg-black relative border-t border-zinc-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        {/* Header */}
                        <div className="flex items-end justify-between mb-16 border-b border-zinc-800 pb-6">
                            <div>
                                <h2 className="text-4xl md:text-6xl font-black font-mono text-white tracking-tighter mb-2">
                                    VISUAL_DATABASE
                                </h2>
                                <p className="text-zinc-500 font-mono text-xs md:text-sm tracking-widest uppercase">
                                    // DECRYPTED_ASSETS_COLLECTION
                                </p>
                            </div>
                            <div className="hidden md:flex items-center gap-2 text-[#ccff00] font-mono text-xs animate-pulse">
                                <div className="w-2 h-2 rounded-full bg-[#ccff00]"></div>
                                LIVE_FEED
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {character.gallery.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group relative bg-zinc-900/50 border border-zinc-800 p-2 hover:border-[#ccff00]/50 transition-colors duration-300"
                                    onMouseEnter={() => sfx.hover()}
                                    onClick={() => sfx.click()}
                                >
                                    {/* Corner Accents (appearing on hover) */}
                                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ccff00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
                                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ccff00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
                                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ccff00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ccff00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

                                    {/* Image */}
                                    <div className="relative aspect-square w-full bg-black overflow-hidden mb-3">
                                        <Image
                                            src={img}
                                            alt={`Evidence ${idx}`}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Overlay Grid */}
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                                    </div>

                                    {/* Metadata Footer */}
                                    <div className="flex items-center justify-between font-mono text-[10px] uppercase text-zinc-500 group-hover:text-zinc-300 transition-colors px-1">
                                        <span>IMG_SEQ_00{idx + 1}.RAW</span>
                                        <span className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-[#ccff00] transition-colors"></span>
                                            SECURE
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
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
