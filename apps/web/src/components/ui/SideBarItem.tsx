import type { ReactElement } from "react";

export function SideBarItem({icon, text} : { icon:ReactElement, text:string}){
    return <>
        <div className="w-full h-12 flex gap-3 px-4 text-gray-700  items-center hover:bg-blue-500 hover:text-white hover:scale-[1.05] rounded transition-colors duration-300">
            {icon} {text}
        </div>
    </>;
}
