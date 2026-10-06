import { ArticleIcon } from "../components/icons/ArticleIcon";
import { DocumentIcon } from "../components/icons/DocumentIcon";
import { youtubeVideoId } from "./youtubeVideoId"

interface cardContentInput {
    type: string,
    link: string
}

export function CardContent(props: cardContentInput){

    if(props.type === "youtube"){
        const vidId = youtubeVideoId(props.link);

        return (
            <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${vidId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        )
    }

    else if(props.type === "twitter"){
        return (
            <blockquote className="twitter-tweet">
                <a href={props.link}></a>
            </blockquote>
        )
    }

    else if(props.type === "article"){
        return (
            <a
                href={props.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex flex-col items-center justify-center gap-3 bg-white hover:bg-slate-50 transition"
            >
                <div className="text-5xl">
                    <ArticleIcon/>
                </div>

                <div className="text-center">
                    <p className="font-semibold text-lg">
                        Article
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                        Click to read
                    </p>
                </div>
            </a>
        )
    }

    else if(props.type === "document"){
        return (
            <a
                href={props.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex flex-col items-center justify-center gap-3 bg-white hover:bg-slate-50 transition"
            >
                <div className="text-5xl">
                    <DocumentIcon/>
                </div>

                <div className="text-center">
                    <p className="font-semibold text-lg">
                        Document
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                        Click to open
                    </p>
                </div>
            </a>
        )
    }

    return <div></div>
}