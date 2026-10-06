import { api } from "../api";

export async function fetchContents (){
    const token = localStorage.getItem("token");
    const response =await  api.get("/user/contents", { headers: {token:token}});
    console.log("retutning ");
    console.log(response.data.contents);
    return response.data.contents;
}
