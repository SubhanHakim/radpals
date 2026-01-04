import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import CharacterRoster from "@/components/landing/CharacterRoster";
import ChatWidget from "@/components/chat/ChatWidget";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-500 selection:text-white">
      <Hero />
      <About />
      <CharacterRoster />

      <ChatWidget />
    </main>
  );
}
