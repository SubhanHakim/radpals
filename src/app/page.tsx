import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import CharacterRoster from "@/components/landing/CharacterRoster";
import JoinCommunity from "@/components/landing/JoinCommunity";
import ChatWidget from "@/components/chat/ChatWidget";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-500 selection:text-white">
      <Hero />
      <About />
      <CharacterRoster />
      <JoinCommunity />

      <ChatWidget />
    </main>
  );
}
