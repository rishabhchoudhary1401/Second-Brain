import { Navigate, Outlet } from "react-router-dom";
import { Header, SideBar } from "../components/ui";

export function AuthenticatedRoots(){
    const token = localStorage.getItem("token");
    if(!token){
        return <Navigate to="/signin" replace />;

    }
    return (
        <div className="flex h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <SideBar />

            <div className="flex-1 flex flex-col bg-slate-100 dark:bg-gray-950">
                <Header />

                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
