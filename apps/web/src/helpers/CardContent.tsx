import { useEffect, useRef } from "react";
import { DocumentIcon } from "../components/icons/DocumentIcon";
import { youtubeVideoId } from "./youtubeVideoId";

interface CardContentInput {
    type: string;
    link: string;
}

// Loads twitter widget script once globally
function loadTwitterScript() {
    if (document.getElementById("twitter-wjs")) return;
    const script = document.createElement("script");
    script.id = "twitter-wjs";
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
}

export function CardContent(props: CardContentInput) {
    const tweetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props.type === "twitter") {
            loadTwitterScript();
            const tw = (window as any).twttr;
            if (tw && tw.widgets) {
                tw.widgets.load(tweetRef.current ?? undefined);
            }
        }
    }, [props.type, props.link]);

    if (props.type === "youtube") {
        const vidId = youtubeVideoId(props.link);
        const thumbnailUrl = `https://img.youtube.com/vi/${vidId}/hqdefault.jpg`;

        return (
            <a
                href={props.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative w-full aspect-video overflow-hidden rounded-lg group cursor-pointer shadow-xs"
            >
                <img
                    src={thumbnailUrl}
                    alt="YouTube thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/45 flex items-center justify-center transition-colors">
                    <div className="bg-red-600 text-white rounded-full p-2.5 shadow-lg group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            </a>
        );
    }

    if (props.type === "twitter") {
        const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
        return (
            <div ref={tweetRef} className="w-full max-h-72 overflow-y-auto">
                <blockquote className="twitter-tweet" data-dnt="true" data-theme={isDark ? "dark" : "light"}>
                    <a href={props.link.replace("x.com", "twitter.com")}></a>
                </blockquote>
            </div>
        );
    }

    if (props.type === "article") {
        return (
            <a
                href={props.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 flex flex-col items-center justify-center gap-2 cursor-pointer group"
            >
                {/* Black rounded icon with white lines matching the exact screenshot */}
                <div className="w-14 h-14 bg-black dark:bg-white text-white dark:text-black rounded-xl flex flex-col justify-center items-center gap-1.5 p-3 shadow-sm group-hover:scale-105 transition-transform duration-200">
                    <div className="w-7 h-1.5 bg-current rounded-xs"></div>
                    <div className="w-7 h-1.5 bg-current rounded-xs"></div>
                    <div className="w-5 h-1.5 bg-current rounded-xs self-start ml-0.5"></div>
                </div>

                <p className="font-bold text-xl text-gray-900 dark:text-gray-100 mt-2">
                    Article
                </p>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Click to read
                </p>
            </a>
        );
    }

    if (props.type === "document") {
        return (
            <a
                href={props.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 flex flex-col items-center justify-center gap-2 cursor-pointer group"
            >
                <div className="w-14 h-14 bg-black dark:bg-white text-white dark:text-black rounded-xl flex flex-col justify-center items-center p-3 shadow-sm group-hover:scale-105 transition-transform duration-200">
                    <DocumentIcon size={1.8} />
                </div>

                <p className="font-bold text-xl text-gray-900 dark:text-gray-100 mt-2">
                    Document
                </p>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Click to open
                </p>
            </a>
        );
    }

    return <div></div>;
}
