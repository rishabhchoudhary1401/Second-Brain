import { useState } from "react";
import Button from "./Button";
import { createContent } from "../../helpers/uploadContent";

export function CreateContentModal({ opened, onClose }) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [type, setType] = useState("");
    const [tags, setTags] = useState("");
    if (!opened) return null;

    return (
        <div onClick={onClose} className="bg-slate-500/70 fixed top-0 left-0 h-full w-full flex justify-center items-center ">
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center bg-white p-16 rounded-2xl border relative">
                <button onClick={onClose} className="absolute right-3 top-3 cursor-pointer"
        >
        ✕
        </button>
                <div className="grid gap-2">
                    <input className="border rounded pl-2 pr-8 py-2 text-black" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                    <input className="border rounded pl-2 pr-8 py-2 text-black" type="text" placeholder="Link" onChange={(e) => setLink(e.target.value)} />
                    <select className="border rounded pl-1 pr-8 py-2 text-black bg-white" onChange={(e) => setType(e.target.value)} >
                        <option value="">Select type</option>
                        <option value="youtube">YouTube</option>
                        <option value="twitter">Twitter</option>
                        <option value="article">Article</option>
                        <option value="document">Document</option>
                    </select>
                    <input className="border rounded pl-2 pr-8 py-2 text-black" type="text" placeholder="tags" onChange={(e) => setTags(e.target.value)}/>
                </div>

                <div className="mt-4">
                    <Button text="Submit" variant="primary" onClick={()=>{submit({title, link, type, tags, onClose})}}/>
                </div>
            </div>
        </div>
    );
}

async function submit({title, link, type, tags, onClose}:{title:string, link:string, type:string, tags:string, onClose: React.Dispatch<React.SetStateAction<boolean>>}){
    const tagArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "");

    console.log({
        title,
        link,
        type,
        tags: tagArray
    });
    const result = await createContent({
        title,
        link,
        type,
        tags: tagArray
    });
    console.log(result);
    if(result.success){
        onClose(false);
    }

}