import logo from "../../assets/logo.svg";
import { ArticleIcon } from "../icons/ArticleIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { HomeIcon } from "../icons/Home";
import { TwitterIcon } from "../icons/TwitterIcon";
import { UserIcon } from "../icons/UserIcon";
import { YoutubrIcon } from "../icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItem";
import { useNavigate, useLocation } from "react-router-dom";

export function SideBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="w-64 min-w-[16rem] max-w-[16rem] flex-shrink-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden sm:flex flex-col">
                {/* Brand / Logo - exact matching height with Header */}
                <div
                    onClick={() => navigate("/home")}
                    className="h-16 flex items-center gap-3 px-5 border-b border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors"
                >
                    <img className="h-8 w-8" src={logo} alt="Second Brain Logo" />
                    <span className="font-bold text-xl text-gray-900 dark:text-gray-50 tracking-tight">
                        Second Brain
                    </span>
                </div>

                {/* Nav Links */}
                <nav className="mt-4 px-3 flex flex-col gap-1.5 flex-1">
                    <SideBarItem
                        icon={<HomeIcon />}
                        text="Home"
                        styles={isActive("/home") || isActive("/") ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-medium" : ""}
                        onClick={() => navigate("/home")}
                    />
                    <SideBarItem
                        icon={<YoutubrIcon />}
                        text="YouTube Links"
                        styles={isActive("/youtube") ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-medium" : ""}
                        onClick={() => navigate("/youtube")}
                    />
                    <SideBarItem
                        icon={<TwitterIcon />}
                        text="Tweets"
                        styles={isActive("/tweets") ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-medium" : ""}
                        onClick={() => navigate("/tweets")}
                    />
                    <SideBarItem
                        icon={<ArticleIcon />}
                        text="Articles"
                        styles={isActive("/articles") ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-medium" : ""}
                        onClick={() => navigate("/articles")}
                    />
                    <SideBarItem
                        icon={<DocumentIcon />}
                        text="Documents"
                        styles={isActive("/documents") ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-medium" : ""}
                        onClick={() => navigate("/documents")}
                    />
                </nav>

                {/* Footer Account */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-800">
                    <SideBarItem
                        icon={<UserIcon />}
                        text="My Account"
                        styles={isActive("/myProfile") ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-medium" : ""}
                        onClick={() => navigate("/myProfile")}
                    />
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md w-full sm:hidden fixed bottom-0 left-0 right-0 flex border-t border-gray-200 dark:border-gray-800 shadow-lg z-50 py-1">
                <SideBarItem styles="justify-center flex-1 py-2" icon={<HomeIcon />} text="" onClick={() => navigate("/home")} />
                <SideBarItem styles="justify-center flex-1 py-2" icon={<YoutubrIcon />} text="" onClick={() => navigate("/youtube")} />
                <SideBarItem styles="justify-center flex-1 py-2" icon={<TwitterIcon />} text="" onClick={() => navigate("/tweets")} />
                <SideBarItem styles="justify-center flex-1 py-2" icon={<ArticleIcon />} text="" onClick={() => navigate("/articles")} />
                <SideBarItem styles="justify-center flex-1 py-2" icon={<UserIcon />} text="" onClick={() => navigate("/myProfile")} />
            </nav>
        </>
    );
}
