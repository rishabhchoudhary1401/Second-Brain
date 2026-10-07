import { useState } from "react";
import { CreateContentModal } from "./CreateContentModal"
import Button from "./Button";
import { PlusIcon } from "../icons/Plus";
import { ShareIcon } from "../icons/share";
import { ShareBrainModal } from "./ShareBrainModal";


export function Header(){
    const [createModal, setCreateModal] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    return <>
        <CreateContentModal opened={createModal} onClose={() => {setCreateModal(false)}} />
        <ShareBrainModal opened={shareOpen} onClose={() => setShareOpen(false)} />
        <header className="h-16 px-6 flex justify-end items-center gap-3">
            <Button text="Add Content" startIcon={<PlusIcon/>} variant="primary" onClick={()=>{setCreateModal(true)}}/>
            <Button text="Share Brain" startIcon={<ShareIcon/>} variant="secondary" onClick={() => setShareOpen(true)} />
        </header>
    </>
}