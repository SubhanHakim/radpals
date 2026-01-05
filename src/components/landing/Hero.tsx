"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center bg-[#1a0505] overflow-hidden">
            {/* Full Screen Background Image */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative w-full h-full"
                >
                    <Image
                        src="/redpals-hero.png"
                        alt="Redpals Universe Banner"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80"></div>
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>

                {/* Texture Overlay */}
                <div
                    className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #111 25%, #111 75%, #000 75%, #000)',
                        backgroundPosition: '0 0, 10px 10px',
                        backgroundSize: '20px 20px'
                    }}
                />
            </div>

            <div className="z-10 w-full max-w-7xl px-4 flex flex-col items-center md:items-start justify-center h-full space-y-10">
                <div className="text-center md:text-left space-y-8 max-w-4xl mx-auto md:ml-0 md:mr-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#ccff00]/30 bg-[#ccff00]/5 text-[#ccff00] font-mono text-sm tracking-widest uppercase"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
                        <span>Necessary Disturbance</span>
                    </motion.div>

                    <h1 className="sr-only">Redpals Universe</h1> {/* Hidden h1 for SEO, visual is the image */}

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="text-white font-black font-mono text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter space-y-2 uppercase"
                    >
                        <p>CHAOS FOR THE <br /><span className="text-zinc-500">OPPRESSORS.</span></p>
                        <p>PROTECTION FOR <br /><span className="text-[#ccff00]">THE OPPRESSED.</span></p>
                        <p className="text-[#ccff00] text-sm md:text-xl pt-6 font-bold tracking-widest">
                            &gt; WE DON'T ASK PERMISSION.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start pt-8"
                    >
                        <button
                            className="px-10 py-4 bg-[#ccff00] hover:bg-[#bbe600] text-black font-mono font-bold text-sm tracking-widest uppercase rounded-sm transition-all shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:shadow-[0_0_40px_rgba(204,255,0,0.6)] cursor-pointer clip-path-polygon"
                            style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
                            onClick={() => {
                                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                            }}
                        >
                            Enter Terminal
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
