import { useEffect, useState } from "react"
import { Card } from "../components/ui/index"
import { fetchContents } from "../helpers/fetchContents";

interface Content {
    _id: string;
    link: string;
    type: "youtube" | "twitter" | "document" | "article";
    title: string;
    tags: {
        _id: string;
        title: string;
    }[];
    userId: string;
}


export function Articles(){

  const [contents, setContent] = useState<Content[]>([]);
  useEffect(()=>{
    async function loadContents(){
      const data = await fetchContents();
      setContent(data);
    }
    loadContents();
  }, []);


    return <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
            {contents.filter((content)=>content.type === "article").map((content) => ( <Card key={content._id} type={content.type} link={content.link} tags={content.tags.map(tag => tag.title)} title={content.title}  />))}
          </div>
}