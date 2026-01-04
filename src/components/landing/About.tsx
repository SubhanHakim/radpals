"use client";

export default function About() {
    return (
        <section className="bg-black py-24 px-4 border-b border-zinc-900 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-950/10 to-transparent pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row gap-16 items-start">

                    {/* Left Column: The Narrative */}
                    <div className="flex-1 space-y-8">
                        <div className="space-y-2">
                            <span className="text-[#ccff00] font-mono text-xs tracking-[0.2em] uppercase block mb-2">
                                // Mission Briefing
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold font-mono text-white leading-tight uppercase relative inline-block">
                                The World Is <span className="text-red-600 line-through decoration-2">Broken</span><br />
                                <span className="bg-zinc-900 text-white px-2">Rigged.</span>
                            </h2>
                        </div>

                        <div className="prose prose-invert prose-lg text-zinc-400 font-mono leading-relaxed">
                            <p>
                                <span className="text-white font-bold">They never set out to be heroes.</span> The old world fell, but the injustice survived. Remnants of the massive corporations still hoard the water, the food, and the safe routes.
                            </p>
                            <p>
                                To them, we are a glitch. A virus. A problem to be debugged.
                            </p>
                            <p>
                                <strong className="text-white">RADPALS</strong> rises as the disruption. We don't ask for permission. We sabotage control, break monopolies, and strike back at anyone who profits from the silence of the oppressed.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <div className="h-px bg-zinc-800 flex-1"></div>
                            <span className="text-xs font-mono text-zinc-600 uppercase">End of Transmission</span>
                        </div>
                    </div>

                    {/* Right Column: Key Directives / Cards */}
                    <div className="w-full md:w-1/3 flex flex-col gap-6">
                        {/* Card 1 */}
                        <div className="bg-zinc-950 border border-zinc-800 p-6 relative group hover:border-red-900 transition-colors">
                            <div className="absolute top-0 right-0 p-2 opacity-50">
                                <span className="text-[10px] text-zinc-600 border border-zinc-800 px-1">DIR_01</span>
                            </div>
                            <h3 className="text-red-500 font-mono font-bold text-lg mb-2 group-hover:text-red-400">CHAOS FOR OPPRESSORS</h3>
                            <p className="text-xs text-zinc-500 font-mono leading-relaxed">
                                We target the choke points. If they hoard it, we break it open. If they gatekeep it, we tear down the gate.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-zinc-950 border border-zinc-800 p-6 relative group hover:border-[#ccff00]/50 transition-colors">
                            <div className="absolute top-0 right-0 p-2 opacity-50">
                                <span className="text-[10px] text-zinc-600 border border-zinc-800 px-1">DIR_02</span>
                            </div>
                            <h3 className="text-[#ccff00] font-mono font-bold text-lg mb-2">PROTECTION FOR THE OPPRESSED</h3>
                            <p className="text-xs text-zinc-500 font-mono leading-relaxed">
                                To the powerless, we are the only shield left. We don't sell hope. We provide cover fire.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-zinc-950 border border-zinc-800 p-6 relative group hover:border-white transition-colors">
                            <div className="absolute top-0 right-0 p-2 opacity-50">
                                <span className="text-[10px] text-zinc-600 border border-zinc-800 px-1">DIR_03</span>
                            </div>
                            <h3 className="text-white font-mono font-bold text-lg mb-2">NO PERMISSION</h3>
                            <p className="text-xs text-zinc-500 font-mono leading-relaxed">
                                Polished symbols don't survive the wasteland. We are the necessary disturbance.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
