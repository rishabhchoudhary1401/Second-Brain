import { useEffect, useState } from "react";
import { Card } from "../components/ui/index";
import { fetchContents } from "../helpers/fetchContents";

interface Content {
    _id: string;
    link: string;
    type: "youtube" | "twitter" | "document" | "article";
    title: string;
    tags: {
        _id: string;
        title: string;
    }[];
    userId: string;
}

export function Home() {
    const [contents, setContent] = useState<Content[]>([]);

    useEffect(() => {
        async function loadContents() {
            const data = await fetchContents();
            setContent(data);
        }
        loadContents();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 dark:bg-gray-950 min-h-full justify-items-center">
            {contents.map((content) => (
                <Card
                    key={content._id}
                    contentId={content._id}
                    editable
                    type={content.type}
                    link={content.link}
                    tags={content.tags.map(tag => tag.title)}
                    title={content.title}
                />
            ))}
        </div>
    );
}
