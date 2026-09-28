import logo from "../../assets/logo.png";
import { ArticleIcon } from "../icons/ArticleIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { HomeIcon } from "../icons/Home";
import { TwitterIcon } from "../icons/TwitterIcon";
import { UserIcon } from "../icons/UserIcon";
import { YoutubrIcon } from "../icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItem";

export function SideBar(){
    return <>
    <div className = " transition-all duration-1000 bg-white-500 h-screen sm:translate-x-0  w-0 sm:w-74 -translate-x-60 border-r flex flex-col">
        <div className="flex items-center ">
            <img className=" h-15 w-15 m-3 " src= {logo} />
            <h1 className="text-blue-700 text-3xl font-extralight">Second Brain</h1>
        </div>



        <div className="mt-8 px-1">
            <SideBarItem icon={<HomeIcon/>} text="Home" />
            <SideBarItem icon={<YoutubrIcon/>} text="YouTube Links" />
            <SideBarItem icon={<TwitterIcon/>} text="Tweets" />
            <SideBarItem icon={<ArticleIcon/>} text="Articles" />
            <SideBarItem icon={<DocumentIcon/>} text="Documents" />
        </div>
        <div className="mt-auto px-1 py-2">
            <SideBarItem icon={<UserIcon/>} text="My Account" />
        </div>


       
        
    </div>
    </>
}