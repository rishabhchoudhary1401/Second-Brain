import { ArticleIcon } from "../icons/ArticleIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { PlusIcon } from "../icons/Plus";
import { ShareIcon } from "../icons/share";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubrIcon } from "../icons/YoutubeIcon";




//input - type

interface cardInputs{
    type: "youtube" | "document" | "twitter" | "article",
    link: string,
    title: string
}
export function Card(props:cardInputs){



    let Icon = DocumentIcon;
    if(props.type === "youtube") {
        Icon = YoutubrIcon;
    }
    else if(props.type === "article") {
        Icon = ArticleIcon;
    }
    else if(props.type === "twitter") {
        Icon = TwitterIcon;
    }


    
    return <div className="bg-white rounded-md shadow-md border-gray-200 p-4 m-2 max-w-72 ">
        <div className="flex justify-between" >
            <div className="flex items-center">
                <div className=" pr-2 text-gray-500 text-md ">
                    <Icon size={1} />
                </div>
                <div>
                    {props.title}
                </div>
            </div>
            <div className="flex items-center text-gray-500">
                <div className="pr-2">
                    <ShareIcon />
                </div>
                <div>
                    <DeleteIcon />
                </div>
            </div>

        </div>
        <div className=" ">
            <iframe className="w-full h-full" src="https://www.youtube.com/embed/YsB4Vhlv8ns?list=RDYsB4Vhlv8ns" title="Dhanda Nyoliwala - La La La (Music Video) | Deepesh Goyal | VYRL Haryanvi" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
    </div>
}