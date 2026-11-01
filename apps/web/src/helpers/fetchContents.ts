import { api } from "../api";

export async function fetchContents (){
    const token = localStorage.getItem("token");
    const response =await  api.get("/user/contents", { headers: {token:token}});
    return response.data.contents;
}
