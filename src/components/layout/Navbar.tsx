"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "HOME", href: "/" },
        { name: "TERMINAL", href: "#terminal", action: true }, // Action true means it scrolls
        { name: "LORE", href: "#" }, // Placeholder
        { name: "DOCS", href: "#" },
    ];

    const handleScrollTo = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id.replace('#', ''));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled
                ? "bg-black/90 backdrop-blur-md border-zinc-800 py-3"
                : "bg-transparent border-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

                {/* Logo Area */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="relative w-40 h-10 hover:scale-105 transition-transform">
                        <Image
                            src="/redpals-logo.png"
                            alt="Redpals Logo"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => link.action ? handleScrollTo(e, link.href) : null}
                            className="text-xs font-mono tracking-widest text-zinc-400 hover:text-[#ccff00] transition-colors relative group"
                        >
                            {/* Hover brackets effect */}
                            <span className="absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#ccff00]">[</span>
                            {link.name}
                            <span className="absolute -right-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#ccff00]">]</span>
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white hover:text-[#ccff00]"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span className="font-mono text-sm tracking-widest">[MENU]</span>
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-black border-b border-zinc-800 p-4 md:hidden flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => link.action ? handleScrollTo(e, link.href) : null}
                            className="text-sm font-mono tracking-widest text-zinc-400 hover:text-[#ccff00] border-l-2 border-transparent hover:border-[#ccff00] pl-3 transition-all"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
}
