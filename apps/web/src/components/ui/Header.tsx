import { useState } from "react";
import { CreateContentModal } from "./CreateContentModal";
import Button from "./Button";
import { PlusIcon } from "../icons/Plus";
import { ShareIcon } from "../icons/share";
import { ShareBrainModal } from "./ShareBrainModal";
import { DarkModeToggle } from "./DarkModeToggle";

export function Header() {
    const [createModal, setCreateModal] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    return (
        <>
            <CreateContentModal opened={createModal} onClose={() => setCreateModal(false)} />
            <ShareBrainModal opened={shareOpen} onClose={() => setShareOpen(false)} />
            <header className="sticky top-0 z-10 h-16 px-6 flex items-center justify-between bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-xs">
                {/* Left side title / breadcrumb */}
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 tracking-tight">Dashboard</h2>
                </div>

                {/* Right side actions */}
                <div className="flex items-center gap-3">
                    <Button
                        text="Add Content"
                        startIcon={<PlusIcon />}
                        variant="primary"
                        onClick={() => setCreateModal(true)}
                    />
                    <Button
                        text="Share Brain"
                        startIcon={<ShareIcon />}
                        variant="secondary"
                        onClick={() => setShareOpen(true)}
                    />
                    <DarkModeToggle />
                </div>
            </header>
        </>
    );
}
