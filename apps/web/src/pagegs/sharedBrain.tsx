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
    const [searchParams] = useSearchParams();
    const hash = searchParams.get("hash");

    useEffect(()=>{
        async function loadContents(){
            if (!hash) return;
            const data = await fetchSharedContents(hash);
            setContent(data);
        }
        loadContents();
      }, [hash]);

    return (
        <div className="flex h-screen">
            <SideBar />

            <div className="flex-1 flex flex-col bg-slate-100">
                <Header />

                <main className="flex-1 overflow-scroll">
                    

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                        {contents.map((content) => ( <Card key={content._id} type={content.type} link={content.link} tags={content.tags.map(tag => tag.title)} title={content.title}  />))}
                    </div>


                </main>
            </div>
        </div>
    )
}