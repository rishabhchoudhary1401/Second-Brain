import { useState } from "react";
import { contentBodyType } from "../../../../../packages/types/contentSchemas";
import { createContent, updateContent } from "../../helpers/uploadContent";
import Button from "./Button";

type ContentType = "youtube" | "twitter" | "article" | "document";

interface InitialContent {
    title: string;
    link: string;
    type: ContentType;
    tags: string[];
}

interface CreateContentModalProps {
    opened: boolean;
    onClose: () => void;
    contentId?: string;
    initialContent?: InitialContent;
}

export function CreateContentModal({ opened, onClose, contentId, initialContent }: CreateContentModalProps) {
    const [title, setTitle] = useState(initialContent?.title || "");
    const [link, setLink] = useState(initialContent?.link || "");
    const [type, setType] = useState(initialContent?.type || "");
    const [tags, setTags] = useState(initialContent?.tags.join(", ") || "");
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const isEditing = Boolean(contentId);

    if (!opened) return null;

    async function submit() {
        const tagArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "");
        const result = contentBodyType.safeParse({ title, link, type, tags: tagArray });

        if (!result.success) {
            setValidationErrors(result.error.issues.map(issue => issue.path[0]?.toString() || ""));
            setMessage("Please fill the required fields.");
            return;
        }

        setValidationErrors([]);
        setMessage("");
        setLoading(true);

        const saveResult = isEditing
            ? await updateContent(contentId!, result.data)
            : await createContent(result.data);

        setLoading(false);
        if (!saveResult.success) {
            setMessage(saveResult.message);
            return;
        }

        onClose();
        window.location.reload();
    }

    return (
        <div onClick={onClose} className="bg-slate-500/70 fixed top-0 left-0 h-full w-full flex justify-center items-center ">
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center bg-white p-16 rounded-2xl border relative">
                <button onClick={onClose} className="absolute right-3 top-3 cursor-pointer">
                    ✕
                </button>
                <div className="grid gap-2">
                    <input className={`border rounded pl-2 pr-8 py-2 text-black ${validationErrors.includes("title") ? "border-red-500" : ""}`} type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input className={`border rounded pl-2 pr-8 py-2 text-black ${validationErrors.includes("link") ? "border-red-500" : ""}`} type="text" placeholder="Link" value={link} onChange={(e) => setLink(e.target.value)} />
                    <select className={`border rounded pl-1 pr-8 py-2 text-black bg-white ${validationErrors.includes("type") ? "border-red-500" : ""}`} value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="">Select type</option>
                        <option value="youtube">YouTube</option>
                        <option value="twitter">Twitter</option>
                        <option value="article">Article</option>
                        <option value="document">Document</option>
                    </select>
                    <input className="border rounded pl-2 pr-8 py-2 text-black" type="text" placeholder="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>

                {message && (
                    <div className="mt-3 text-center text-sm text-red-500">
                        {message}
                    </div>
                )}

                <div className="mt-4">
                    <Button text={loading ? "Saving..." : isEditing ? "Save Changes" : "Submit"} variant="primary" onClick={submit} disabled={loading} />
                </div>
            </div>
        </div>
    );
}
