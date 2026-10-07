import logo from "../../assets/logo.png";
import { ArticleIcon } from "../icons/ArticleIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { HomeIcon } from "../icons/Home";
import { TwitterIcon } from "../icons/TwitterIcon";
import { UserIcon } from "../icons/UserIcon";
import { YoutubrIcon } from "../icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItem";
import { useNavigate } from "react-router-dom";


export function SideBar(){
    console.log("loading sidebar...");
    const navigate = useNavigate();
    return <>

    {/* desktop version */}

    <div className="transition-all duration-1000 bg-white h-screen sm:translate-x-0 w-0 sm:w-72 border-r flex flex-col">
        <div onClick={()=> navigate("/home")} className="flex items-center cursor-pointer">
            <img className=" h-15 w-15 m-3 " src= {logo} />
            <h1 className="text-blue-700 text-3xl font-extralight">Second Brain</h1>
        </div>



        <div className="mt-8 px-1">
            <SideBarItem icon={<HomeIcon/>} text="Home" onClick={()=> navigate("/home")} />
            <SideBarItem icon={<YoutubrIcon/>} text="YouTube Links" onClick={()=>navigate("/youtube")} />
            <SideBarItem icon={<TwitterIcon/>} text="Tweets" onClick={()=>navigate("/tweets")} />
            <SideBarItem icon={<ArticleIcon/>} text="Articles" onClick={()=>navigate("/articles")} />
            <SideBarItem icon={<DocumentIcon/>} text="Documents" onClick={()=>navigate("/documents")} />
        </div>
        <div className="mt-auto px-1 py-2">
            <SideBarItem icon={<UserIcon/>} text="My Account" onClick={()=>navigate("/myProfile")} />
        </div>  
    </div>

    {/* mobile version */}
    <div className="transition-all duration-1000 bg-white-500 w-screen sm:hidden fixed bottom-0 left-0 right-0 flex">
        <SideBarItem styles="bg-white justify-center" icon={<HomeIcon/>} text="" onClick={()=>navigate("/home")} />
        <SideBarItem styles="bg-white justify-center" icon={<YoutubrIcon/>} text="" onClick={()=>navigate("/youtube")} />
        <SideBarItem styles="bg-white justify-center" icon={<TwitterIcon/>} text="" onClick={()=>navigate("/tweets")} />
        <SideBarItem styles="bg-white justify-center" icon={<UserIcon/>} text="" onClick={()=>navigate("/myProfile")} />
    </div>
    </>
}