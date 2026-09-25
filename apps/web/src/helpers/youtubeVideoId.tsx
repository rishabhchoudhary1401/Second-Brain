export function youtubeVideoId(link){
    try{
        const url = new URL(link);
        if(url.hostname==="youtu.be"){
            return url.pathname.slice(1);
        }
        if(url.searchParams.has("v")){
            return url.searchParams.get("v");
        }
        const parts = url.pathname.split("/");
        const embedIndex = parts.indexOf("embed");
        const shortsIndex = parts.indexOf("shorts");
        if (embedIndex !== -1) return parts[embedIndex + 1];
        if (shortsIndex !== -1) return parts[shortsIndex + 1];
        return "invalid url...";
    }catch(e){
        return e;
        
    }
}