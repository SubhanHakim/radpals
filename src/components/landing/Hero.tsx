"use client";

import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center bg-[#1a0505] overflow-hidden">
            {/* Full Screen Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/redpals-hero.png"
                    alt="Redpals Universe Banner"
                    fill
                    className="object-cover object-center"
                    priority
                />
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

            <div className="z-10 w-full max-w-7xl px-4 flex flex-col items-center justify-end h-full pb-20 space-y-8">
                <div className="text-center space-y-6 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#ccff00]/30 bg-[#ccff00]/5 text-[#ccff00] font-mono text-xs tracking-widest uppercase">
                        <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
                        <span>Necessary Disturbance</span>
                    </div>

                    <h1 className="sr-only">Redpals Universe</h1> {/* Hidden h1 for SEO, visual is the image */}

                    <div className="text-zinc-300 font-mono text-sm md:text-base leading-relaxed tracking-wide space-y-2">
                        <p>CHAOS FOR THE OPPRESSORS.</p>
                        <p>PROTECTION FOR THE OPPRESSED.</p>
                        <p className="text-[#ccff00]/80 text-xs pt-2">
                            &gt; WE DON'T ASK PERMISSION.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                        <button
                            className="px-10 py-4 bg-[#ccff00] hover:bg-[#bbe600] text-black font-mono font-bold text-sm tracking-widest uppercase rounded-sm transition-all shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:shadow-[0_0_40px_rgba(204,255,0,0.6)] cursor-pointer clip-path-polygon"
                            style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
                            onClick={() => {
                                const el = document.getElementById('terminal');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Enter Terminal
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
