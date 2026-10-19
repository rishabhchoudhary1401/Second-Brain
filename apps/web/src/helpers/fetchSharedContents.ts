import { api } from "../api";

export async function fetchSharedContents(hash:string){
    const response = await api.get("/user/get_shared_brain", {
        params: {
            hash: hash
        }
    });
    return response.data;
}