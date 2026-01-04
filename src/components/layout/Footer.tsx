import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-zinc-900 py-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">

                {/* Logo & Copyright */}
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    <Link href="/" className="relative w-24 h-8 opacity-80 hover:opacity-100 transition-opacity">
                        <Image
                            src="/redpals-logo.png"
                            alt="Redpals"
                            fill
                            className="object-contain object-left"
                        />
                    </Link>
                    <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-wider text-center md:text-left">
                        &copy; 2024 Radpals. No Rights Reserved.
                    </p>
                </div>

                {/* Simple Links */}
                <div className="flex items-center gap-8">
                    <Link href="#" className="text-zinc-500 hover:text-white text-xs font-mono uppercase tracking-wide transition-colors">
                        X / Twitter
                    </Link>
                    <Link href="#" className="text-zinc-500 hover:text-white text-xs font-mono uppercase tracking-wide transition-colors">
                        Telegram
                    </Link>
                    <Link href="#" className="text-zinc-500 hover:text-white text-xs font-mono uppercase tracking-wide transition-colors">
                        Docs
                    </Link>
                </div>
            </div>
        </footer>
    );
}
