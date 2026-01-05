import { getCharacterBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import AgentDetailView from "@/components/agent/AgentDetailView";
import ChatWidget from "@/components/chat/ChatWidget";

export const dynamic = "force-dynamic";

interface PageProps {
    params: {
        id: string; // Slug
    }
}

export default async function AgentDetailPage({ params }: PageProps) {
    const { id } = await params;
    const character = await getCharacterBySlug(id);

    if (!character) {
        notFound();
    }

    return (
        <main>
            {/* 
              We pass the character data to the client component.
              We cast it loosely to any to avoid strict TS conflicts between server/client types 
              if the DB type definition varies slightly, but the shape matches.
            */}
            <AgentDetailView character={character as any} />
            <ChatWidget />
        </main>
    );
}
