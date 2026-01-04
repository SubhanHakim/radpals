"use client";

import { useState } from "react";
import ChatUI from "./ChatUI";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-8 right-8 z-50 flex items-end">
            {/* Popup Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-[85vw] md:w-[400px] h-[500px] shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom-5 fade-in duration-300 origin-bottom-right">
                    <ChatUI className="w-full h-full border-red-900/40" />
                    {/* Pointer triangle */}
                    <div className="absolute -bottom-2 right-6 w-4 h-4 bg-black border-r border-b border-zinc-800 rotate-45 transform"></div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-[#ccff00] hover:bg-[#b3e600] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] transition-all active:scale-95 text-black border-2 border-transparent hover:border-black/10 group relative z-50"
                aria-label="Toggle Terminal"
            >
                {isOpen ? (
                    // X icon
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    // Chat/Terminal Icon
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:animate-pulse">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                )}
            </button>
        </div>
    );
}
