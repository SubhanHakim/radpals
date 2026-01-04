import { getCharacterById } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
    params: {
        id: string;
    }
}

export default async function AgentDetailPage({ params }: PageProps) {
    const { id } = await params;
    const character = await getCharacterById(id);

    if (!character) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[128px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[128px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Breadcrumb / Back */}
                <div className="mb-8">
                    <Link href="/#agents" className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#ccff00] transition-colors font-mono text-sm group">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        BACK TO ROSTER
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Visuals */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50 group">
                            <Image
                                src={character.image_url}
                                alt={character.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                            {/* Status Pill */}
                            <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-[#ccff00]/30 text-[#ccff00] text-xs font-mono uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse"></span>
                                {character.status}
                            </div>
                        </div>

                        {/* ID Card / Metadata */}
                        <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 space-y-4">
                            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                                <span className="text-zinc-500 font-mono text-xs uppercase">Agent ID</span>
                                <span className="text-white font-mono text-sm">{String(character.id).split('-')[0].toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                                <span className="text-zinc-500 font-mono text-xs uppercase">Class</span>
                                <span className="text-[#ccff00] font-mono text-sm">{character.role}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-500 font-mono text-xs uppercase">Deployment</span>
                                <span className="text-white font-mono text-sm">Sector 7 (Ruins)</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Intel */}
                    <div className="lg:col-span-7 space-y-8">
                        <div>
                            <h1 className="text-5xl md:text-7xl font-bold font-mono tracking-tighter text-white mb-2">
                                {character.name}
                            </h1>
                            <p className="text-xl md:text-2xl text-[#ccff00] font-mono opacity-90">
                                {character.role}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="prose prose-invert prose-lg max-w-none">
                                <p className="leading-relaxed text-zinc-300">
                                    {character.bio}
                                </p>
                            </div>

                            {/* Traits */}
                            <div>
                                <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-4">
                                    Combat Parameters
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {character.traits && character.traits.map((trait: string, idx: number) => (
                                        <div key={idx} className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-sm flex items-center gap-2">
                                            <span className="text-[#ccff00]">&gt;</span>
                                            {trait}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-8 flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 px-8 py-4 bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold font-mono text-sm tracking-wide uppercase transition-all rounded-sm flex items-center justify-center gap-2">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                Establish Comms
                            </button>
                            <button className="flex-1 px-8 py-4 bg-transparent border border-zinc-700 hover:border-white text-white hover:bg-white/5 font-bold font-mono text-sm tracking-wide uppercase transition-all rounded-sm">
                                View Full Archive
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
