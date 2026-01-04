"use client";

import { useState } from "react";

export default function AgentActions() {
    return (
        <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <button
                onClick={() => {
                    // Trigger custom event that ChatWidget listens to
                    window.dispatchEvent(new CustomEvent('open-chat'));
                }}
                className="flex-1 px-8 py-4 bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold font-mono text-sm tracking-wide uppercase transition-all rounded-sm flex items-center justify-center gap-2"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                Establish Comms
            </button>
            <button
                onClick={() => {
                    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 px-8 py-4 bg-transparent border border-zinc-700 hover:border-white text-white hover:bg-white/5 font-bold font-mono text-sm tracking-wide uppercase transition-all rounded-sm"
            >
                View Full Archive
            </button>
        </div>
    );
}
