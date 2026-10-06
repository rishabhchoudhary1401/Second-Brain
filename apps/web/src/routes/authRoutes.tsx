import { Navigate, Outlet } from "react-router-dom";
import { Header, SideBar } from "../components/ui";

export function AuthenticatedRoots(){
    const token = localStorage.getItem("token");
    if(!token){
        return <Navigate to="/signin" replace />;

    }
    console.log("hello from authroutes...");
    return (
        <div className="flex h-screen">
            <SideBar />

            <div className="flex-1 flex flex-col bg-slate-100">
                <Header />

                <main className="flex-1 overflow-scroll">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}