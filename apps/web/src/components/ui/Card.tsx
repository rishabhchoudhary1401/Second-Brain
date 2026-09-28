import { ArticleIcon } from "../icons/ArticleIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { ShareIcon } from "../icons/share";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubrIcon } from "../icons/YoutubeIcon";
import { CardContent } from "../../helpers/CardContent";

interface CardInputs {
  type: "youtube" | "document" | "twitter" | "article";
  link: string;
  title: string;
  tags: string[];
}

export function Card(props: CardInputs) {
  let Icon = DocumentIcon;

  if (props.type === "youtube") Icon = YoutubrIcon;
  else if (props.type === "article") Icon = ArticleIcon;
  else if (props.type === "twitter") Icon = TwitterIcon;

  return (
    <div className="bg-white rounded-md shadow-md border border-gray-200 p-4 m-2 max-w-72 max-h-64 overflow-y-auto overflow-x-hidden rounded-lg ">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="pr-2 text-gray-500">
            <Icon size={1} />
          </div>
          <div>{props.title}</div>
        </div>

        <div className="flex items-center text-gray-500">
          <div className="pr-2">
            <ShareIcon link={props.link} />
          </div>
          <DeleteIcon link={props.link} />
        </div>
      </div>

      <div className="mt-3">
        <CardContent type={props.type} link={props.link} />
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {props.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}