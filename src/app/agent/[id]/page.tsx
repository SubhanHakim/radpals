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
    // Await params to ensure compatibility with Next.js 15+
    const resolvedParams = await params;
    const { id } = resolvedParams;

    let character = null;

    try {
        character = await getCharacterBySlug(id);
    } catch (error) {
        console.error("Failed to fetch character for page:", id, error);
        // We can choose to show 404 or a fallback. 404 is safer.
        notFound();
    }

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
