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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700/80 p-5 w-full max-w-sm h-[320px] flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5">
      {props.editable && (
        <CreateContentModal
          opened={editOpen}
          onClose={() => setEditOpen(false)}
          contentId={props.contentId}
          initialContent={{ title: props.title, link: props.link, type: props.type, tags: props.tags }}
        />
      )}

      {/* Top Header */}
      <div className="flex justify-between items-center pb-2 shrink-0 border-b border-gray-50 dark:border-gray-700/50">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="text-gray-500 dark:text-gray-400 shrink-0">
            <Icon size={1.1} />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base truncate">
            {props.title}
          </h3>
        </div>

        {props.editable && (
          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 shrink-0 ml-2">
            <button
              className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1"
              onClick={() => setEditOpen(true)}
              aria-label="Edit content"
              title="Edit content"
            >
              <EditIcon />
            </button>
            <button
              className="cursor-pointer hover:text-red-500 dark:hover:text-red-400 transition-colors p-1"
              onClick={deleteBrain}
              aria-label="Delete content"
              title="Delete content"
            >
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>

      {/* Scrollable Center Content area with capped height */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden my-2 flex flex-col justify-center scrollbar-thin">
        <CardContent type={props.type} link={props.link} />
      </div>

      {/* Bottom Tag Pills */}
      <div className="flex items-center flex-wrap gap-1.5 pt-2 shrink-0 border-t border-gray-50 dark:border-gray-700/50">
        {props.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-medium px-2.5 py-0.5 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
