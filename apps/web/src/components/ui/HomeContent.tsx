import { useState } from "react";
import { CreateContentModal } from "./CreateContentModal"
import Button from "./Button";
import { PlusIcon } from "../icons/Plus";
import { ShareIcon } from "../icons/share";


export function Header(){
    const [createModal, setCreateModal] = useState(false);
    return <>
        <CreateContentModal opened={createModal} onClose={() => {setCreateModal(false)}} />
        <header className="h-16 px-6 flex justify-end items-center gap-3 bg-white">
            <Button text="Add Content" startIcon={<PlusIcon/>} variant="primary" onClick={()=>{setCreateModal(true)}}/>
            <Button text="Share Brain" startIcon={<ShareIcon/>} variant="secondary" />
        </header>
    </>
}