import { youtubeVideoId } from "./youtubeVideoId"

interface cardContentInput {
    type: string,
    link: string
}


export function CardContent(props: cardContentInput){
    if(props.type === "youtube"){
        const vidId = youtubeVideoId(props.link);
        return <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${vidId}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

    }
    else if(props.type === "twitter"){
        return <blockquote className="twitter-tweet ">
            <a href={props.link}></a> 
            </blockquote>
    }

    

    return <div></div>
}