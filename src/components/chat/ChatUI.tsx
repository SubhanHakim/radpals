"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
    role: "user" | "assistant";
    content: string;
    timestamp: string;
};

interface ChatUIProps {
    className?: string;
}

export default function ChatUI({ className }: ChatUIProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    async function sendMessage() {
        if (!input.trim() || loading) return;

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const userMessage: Message = {
            role: "user",
            content: input,
            timestamp,
        };

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
                content: data.reply ?? "No response.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (err) {
            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    content: "CONNECTION ERROR: REDPALS NODE UNREACHABLE.",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`relative flex flex-col bg-black border border-zinc-800 rounded-sm shadow-2xl overflow-hidden font-mono text-sm ${className || "w-full max-w-2xl h-[80vh]"}`}>
            {/* Header / StatusBar */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 z-10">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${loading ? "bg-yellow-500 animate-pulse" : "bg-green-500"}`}></div>
                    <h1 className="text-zinc-400 font-bold tracking-widest uppercase text-xs">
                        Redpals Archivist <span className="text-zinc-600">//</span> v0.1.4
                    </h1>
                </div>
                <div className="text-zinc-600 text-xs">
                    SECURE_Connection::ESTABLISHED
                </div>
            </div>

            {/* Chat Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-6 bg-black custom-scrollbar relative"
            >
                {/* Background Grid/Noise (Optional Visual Flair) */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                </div>

                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-zinc-700 space-y-4 opacity-50">
                        <div className="w-16 h-16 border border-zinc-800 rounded-full flex items-center justify-center">
                            <div className="w-1 h-1 bg-zinc-500 rounded-full animate-ping"></div>
                        </div>
                        <p className="text-xs tracking-widest">AWAITING INPUT...</p>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                    >
                        <div className="flex items-center gap-2 mb-1 opacity-60">
                            <span className={`text-[10px] uppercase tracking-wider ${msg.role === "user" ? "text-blue-500" : "text-red-500"}`}>
                                {msg.role === "user" ? "OPERATOR" : "ARCHIVIST"}
                            </span>
                            <span className="text-[10px] text-zinc-600">[{msg.timestamp}]</span>
                        </div>

                        <div
                            className={`relative px-4 py-3 rounded-sm border backdrop-blur-sm ${msg.role === "user"
                                ? "bg-zinc-900/50 border-zinc-800 text-zinc-300"
                                : "bg-red-950/10 border-red-900/30 text-red-100 shadow-[0_0_15px_rgba(220,38,38,0.05)]"
                                }`}
                        >
                            {/* Decorative corner markers */}
                            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-current opacity-50"></div>
                            <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-current opacity-50"></div>
                            <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-current opacity-50"></div>
                            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-current opacity-50"></div>

                            <div className="whitespace-pre-wrap leading-relaxed">
                                {msg.content}
                            </div>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex items-start max-w-[85%] mr-auto">
                        <div className="flex items-center gap-2 mb-1 opacity-60">
                            <span className="text-[10px] uppercase tracking-wider text-red-500">
                                ARCHIVIST
                            </span>
                        </div>
                        <div className="px-4 py-2 mt-5 text-red-500/50 text-xs animate-pulse">
                            &gt; PROCESSING REQUEST...
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-zinc-900 border-t border-zinc-800">
                <div className="relative flex items-center gap-2">
                    <span className="text-zinc-500 pointer-events-none absolute left-3">&gt;</span>
                    <input
                        className="w-full bg-black border border-zinc-700 rounded-sm py-3 pl-8 pr-4 text-zinc-200 outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-900/20 transition-all font-mono placeholder:text-zinc-700"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="ENTER_COMMAND"
                        disabled={loading}
                        onKeyDown={e => e.key === "Enter" && sendMessage()}
                        autoFocus
                    />
                    <button
                        className="absolute right-2 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-sm border border-zinc-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={sendMessage}
                        disabled={loading || !input.trim()}
                    >
                        SEND
                    </button>
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-zinc-600 uppercase">
                    <span>System: ONLINE</span>
                    <span>Encrypted: AES-256</span>
                </div>
            </div>
        </div>
    );
}
