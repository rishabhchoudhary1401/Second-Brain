import { useState } from "react";
import { ArticleIcon } from "../icons/ArticleIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { EditIcon } from "../icons/EditIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubrIcon } from "../icons/YoutubeIcon";
import { CardContent } from "../../helpers/CardContent";
import { deleteContent } from "../../helpers/uploadContent";
import { CreateContentModal } from "./CreateContentModal";

interface CardInputs {
  contentId: string;
  type: "youtube" | "document" | "twitter" | "article";
  link: string;
  title: string;
  tags: string[];
  editable?: boolean;
}

export function Card(props: CardInputs) {
  const [editOpen, setEditOpen] = useState(false);
  let Icon = DocumentIcon;

  if (props.type === "youtube") Icon = YoutubrIcon;
  else if (props.type === "article") Icon = ArticleIcon;
  else if (props.type === "twitter") Icon = TwitterIcon;

  async function deleteBrain() {
    if (!window.confirm("Are you sure you want to delete this content?")) return;
    const result = await deleteContent(props.contentId);
    if (result.success) {
      window.location.reload();
      return;
    }
    window.alert(result.message);
  }

  return (
    <div className="bg-white rounded-md shadow-md border border-gray-200 p-4 m-2 w-full max-w-72 max-h-72 overflow-y-auto overflow-x-hidden rounded-lg ">
      {props.editable && (
        <CreateContentModal
          opened={editOpen}
          onClose={() => setEditOpen(false)}
          contentId={props.contentId}
          initialContent={{ title: props.title, link: props.link, type: props.type, tags: props.tags }}
        />
      )}
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="pr-2 text-gray-500">
            <Icon size={1} />
          </div>
          <div>{props.title}</div>
        </div>

        {props.editable && (
          <div className="flex items-center gap-2 text-gray-500">
            <button className="cursor-pointer hover:text-blue-600" onClick={() => setEditOpen(true)} aria-label="Edit content" title="Edit content">
              <EditIcon />
            </button>
            <button className="cursor-pointer hover:text-red-600" onClick={deleteBrain} aria-label="Delete content">
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>

      <div className="mt-3">
        <CardContent type={props.type} link={props.link} />
      </div>

      <div className="flex items-center flex-wrap gap-2 mt-3">
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
