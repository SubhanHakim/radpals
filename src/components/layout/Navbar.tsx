"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [mobileMenuOpen]);

    const navLinks = [
        { name: "HOME", href: "/" },
        { name: "ABOUT", href: "#about" },
        { name: "AGENTS", href: "#agents" },
        { name: "COMMUNITY", href: "#community" },
    ];

    const smoothScrollTo = (targetY: number, duration: number = 1000) => {
        const startY = window.scrollY;
        const diff = targetY - startY;
        let startTime: number | null = null;

        // Easing: easeInOutCubic
        const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const step = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            window.scrollTo(0, startY + diff * ease(progress));

            if (timeElapsed < duration) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setMobileMenuOpen(false);

        if (!isHome) return;

        if (href === "/") {
            e.preventDefault();
            smoothScrollTo(0);
            return;
        }

        if (href.startsWith("#")) {
            e.preventDefault();
            const element = document.getElementById(href.replace("#", ""));
            if (element) {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - offset;
                smoothScrollTo(offsetPosition);
            }
        }
    };

    return (
        <nav
            className="sticky top-0 w-full z-50 transition-all duration-300 border-b bg-black border-zinc-800 py-4"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative z-50">
                {/* Logo Area */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/"
                        onClick={(e) => handleNavigation(e, "/")}
                        className="relative w-32 h-8 md:w-40 md:h-10 hover:scale-105 transition-transform"
                    >
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
                        <Link
                            key={link.name}
                            href={isHome ? link.href : (link.href.startsWith("#") ? `/${link.href}` : link.href)}
                            onClick={(e) => handleNavigation(e, link.href)}
                            className="text-xs font-mono tracking-widest text-zinc-400 hover:text-[#ccff00] transition-colors relative group"
                        >
                            <span className="absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#ccff00]">[</span>
                            {link.name}
                            <span className="absolute -right-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#ccff00]">]</span>
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white hover:text-[#ccff00] z-50"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span className="font-mono text-sm tracking-widest">
                        {mobileMenuOpen ? "[CLOSE]" : "[MENU]"}
                    </span>
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col items-center justify-start pt-32 space-y-10"
                    >
                        {/* Background Decor */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-900"></div>
                            <div className="absolute top-0 right-0 w-[1px] h-full bg-zinc-900/50"></div>
                            <div className="absolute left-10 top-40 w-20 h-20 border border-zinc-800/30 rounded-full opacity-20"></div>
                        </div>

                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                                className="relative"
                            >
                                <Link
                                    href={isHome ? link.href : (link.href.startsWith("#") ? `/${link.href}` : link.href)}
                                    onClick={(e) => handleNavigation(e, link.href)}
                                    className="block text-4xl font-black font-mono tracking-tighter text-white hover:text-[#ccff00] transition-colors"
                                >
                                    {link.name}
                                </Link>
                                {/* Decorative number */}
                                <span className="absolute -left-8 top-0 text-[10px] text-zinc-700 font-mono pt-2">
                                    0{i + 1}
                                </span>
                            </motion.div>
                        ))}

                        <div className="absolute bottom-10 w-full text-center px-8">
                            <div className="h-px w-full bg-zinc-900 mb-4"></div>
                            <p className="text-zinc-600 font-mono text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#ccff00] rounded-full"></span>
                                Radical Resistance // System Active
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
