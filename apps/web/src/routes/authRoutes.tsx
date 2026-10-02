import { Navigate, Outlet } from "react-router-dom";

export function AuthenticatedRoots(){
    const token = localStorage.getItem("token");
    if(!token){
        return <Navigate to="/signin" replace />;

    }
    return <Outlet/>;
}