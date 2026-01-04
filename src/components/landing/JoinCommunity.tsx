"use client";

import { motion } from "framer-motion";
import { sfx } from "@/lib/sfx";

export default function JoinCommunity() {
    return (
        <section className="py-32 bg-black relative overflow-hidden border-t border-zinc-900">
            {/* Background Effects matching Hero */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center space-y-10"
                >
                    {/* Signal Indicator */}
                    <div className="flex items-center gap-3">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ccff00] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ccff00]"></span>
                        </span>
                        <span className="text-[#ccff00] font-mono text-xs tracking-[0.3em] uppercase">
                            Secure Channel Open
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h2 className="text-6xl md:text-9xl font-bold font-mono tracking-tighter text-white leading-none">
                        JOIN THE <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ccff00] to-green-600">RADPALS</span>
                    </h2>

                    <p className="max-w-xl text-zinc-400 font-mono text-lg leading-relaxed">
                        The resistance is not just code. It is people. It is you. <br />
                        Connect to the core network now.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex justify-center w-full pt-8">
                        {/* Twitter: Primary Style */}
                        <a
                            href="https://twitter.com/radpals_ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-12 py-5 bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold font-mono text-sm tracking-widest uppercase transition-all rounded-sm flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_40px_rgba(204,255,0,0.5)] transform hover:-translate-y-1"
                            onMouseEnter={() => sfx.hover()}
                            onClick={() => sfx.click()}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                            FOLLOW ON X
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Scrolling Tape Background (Low Opacity) */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 -rotate-3 overflow-hidden pointer-events-none opacity-[0.03]">
                <div className="whitespace-nowrap font-mono text-[20vw] font-bold text-white select-none">
                    RADPALS NETWORK // JOIN THE RESISTANCE // RADPALS NETWORK //
                </div>
            </div>
        </section>
    );
}
