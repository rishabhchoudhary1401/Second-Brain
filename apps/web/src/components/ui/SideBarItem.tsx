import type { ReactElement } from "react";

export function SideBarItem({icon, text, styles, onClick} : { icon:ReactElement, text:string, styles?:string, onClick?: ()=> void; }){
    return <>
        <div onClick={onClick} className={` ${styles} w-full h-12 flex gap-3 px-4 cursor-pointer text-gray-700  items-center hover:bg-blue-500 hover:text-white hover:scale-[1.05] rounded transition-colors duration-300`}>
            {icon} {text}
        </div>
    </>;
}
