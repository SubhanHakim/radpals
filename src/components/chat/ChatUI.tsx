"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
    role: "user" | "assistant";
    content: string;
};

interface ChatUIProps {
    className?: string;
    onClose?: () => void;
}

const suggestions = [
    "Who is ZYKO?",
    "What is the Radpals?",
    "Tell me about the backstory.",
];

export default function ChatUI({ className, onClose }: ChatUIProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]); // Added loading dependency to scroll when loading bubbles appear

    async function sendMessage(content: string = input) {
        if (!content.trim() || loading) return;

        const userMessage: Message = { role: "user", content };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage.content }),
            });

            const data = await res.json();
            const aiMessage: Message = {
                role: "assistant",
                content: data.reply ?? "I have no data on that query.",
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (err) {
            setMessages(prev => [
                ...prev,
                { role: "assistant", content: "Connection interrupted. Secure line unstable." },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`relative flex flex-col bg-[#0f0f10] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden font-sans text-sm ${className || "w-full max-w-md h-[600px]"}`}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#0f0f10] border-b border-zinc-800/50 z-20">
                <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-md overflow-hidden shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                        <Image
                            src="/redpals-logo.png"
                            alt="Redpals Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <h1 className="text-white font-semibold text-sm tracking-wide">RADPALS</h1>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse"></span>
                            <span className="text-[10px] text-zinc-500 font-medium">Online</span>
                        </div>
                    </div>
                </div>

                {/* Close Button (Visible if onClose is provided) */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-zinc-500 hover:text-white transition-colors"
                        aria-label="Close Chat"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                )}
            </div>

            {/* Chat Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#0f0f10] relative scroll-smooth"
            >
                {messages.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center h-full space-y-8 px-8"
                    >
                        <div className="relative">
                            <div className="w-24 h-24 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800 shadow-2xl relative z-10 overflow-hidden">
                                <Image
                                    src="/redpals-logo.png"
                                    alt="Redpals Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Glow behind logo */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#ccff00]/10 rounded-full blur-2xl pointer-events-none"></div>
                        </div>

                        <div className="text-center space-y-2">
                            <p className="text-zinc-400 text-sm font-medium">Ask anything about the Resistance</p>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            {suggestions.map((suggestion, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => sendMessage(suggestion)}
                                    className="w-full py-3 px-4 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-xl text-zinc-300 text-xs text-left transition-all active:scale-[0.98]"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <div className="flex flex-col gap-4 pb-4">
                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className={`flex gap-3 max-w-[90%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                            >
                                {/* Avatar */}
                                {msg.role === "assistant" && (
                                    <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 mt-1">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                                        </svg>
                                    </div>
                                )}

                                {/* Message Bubble */}
                                <div
                                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                        ? "bg-zinc-800 text-white rounded-br-sm"
                                        : "bg-[#ccff00]/10 text-zinc-200 border border-[#ccff00]/10 rounded-bl-sm"
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </motion.div>
                        ))}
                        {loading && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex gap-3 mr-auto max-w-[90%]"
                            >
                                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 mt-1">
                                    <div className="w-4 h-4 rounded-full border-2 border-t-[#ccff00] border-r-transparent border-b-zinc-700 border-l-zinc-700 animate-spin"></div>
                                </div>
                                <div className="px-4 py-3 bg-[#ccff00]/5 rounded-2xl rounded-bl-sm border border-[#ccff00]/5 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></span>
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#0f0f10]">
                <div className="relative flex items-center bg-zinc-900/50 border border-zinc-800 focus-within:border-zinc-700 rounded-full transition-colors overflow-hidden pl-4 pr-2 py-1.5">
                    <input
                        className="w-full bg-transparent text-white text-sm outline-none placeholder:text-zinc-600 h-9"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        disabled={loading}
                        onKeyDown={e => e.key === "Enter" && sendMessage()}
                    />
                    <button
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${input.trim()
                            ? "bg-[#ccff00] text-black hover:scale-105 active:scale-95"
                            : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                            }`}
                        onClick={() => sendMessage()}
                        disabled={loading || !input.trim()}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="19" x2="12" y2="5"></line>
                            <polyline points="5 12 12 5 19 12"></polyline>
                        </svg>
                    </button>
                </div>
                <div className="text-center mt-3">
                    <p className="text-[10px] text-zinc-700">Powered by Redpals Neural Net</p>
                </div>
            </div>
        </div>
    );
}
