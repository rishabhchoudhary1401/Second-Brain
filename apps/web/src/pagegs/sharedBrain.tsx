import { useEffect, useState } from "react";
import { Card, Header, SideBar } from "../components/ui";
import { fetchSharedContents } from "../helpers/fetchSharedContents";
import { useSearchParams } from "react-router-dom";

interface Content {
    _id: string;
    link: string;
    type: "youtube" | "twitter" | "document" | "article";
    title: string;
    tags: {
        _id: string;
        title: string;
    }[];
    userId: {
        _id: string;
        firstName: string;
        lastName: string;
    };
}

export function SharedBrain(){
    const [contents, setContent] = useState<Content[]>([]);
    const [message, setMessage] = useState("");
    const [loadedHash, setLoadedHash] = useState<string | null>();
    const [searchParams] = useSearchParams();
    const hash = searchParams.get("hash");

    useEffect(()=>{
        let ignore = false;
        async function loadContents(){
            if (!hash) return;
            try {
                const data = await fetchSharedContents(hash);
                const sharedContents = Array.isArray(data) ? data : [];
                if (!ignore) {
                    setContent(sharedContents);
                    setMessage(sharedContents.length === 0 ? "This shared brain has no content yet." : "");
                    setLoadedHash(hash);
                }
            } catch {
                if (!ignore) {
                    setContent([]);
                    setMessage("This share link is invalid or unavailable.");
                    setLoadedHash(hash);
                }
            }
        }
        loadContents();
        return () => {
            ignore = true;
        };
      }, [hash]);

    const displayMessage = !hash
        ? "This share link is missing its hash."
        : loadedHash !== hash
            ? "Loading shared brain..."
            : message;

    return (
        <div className="flex h-screen">
            <SideBar />

            <div className="flex-1 flex flex-col bg-slate-100">
                <Header />

                <main className="flex-1 overflow-scroll">
                    

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                        {loadedHash === hash && contents.map((content) => ( <Card key={content._id} contentId={content._id} type={content.type} link={content.link} tags={content.tags.map(tag => tag.title)} title={content.title}  />))}
                    </div>
                    {displayMessage && <div className="py-6 text-center text-gray-500">{displayMessage}</div>}


                </main>
            </div>
        </div>
    )
}
