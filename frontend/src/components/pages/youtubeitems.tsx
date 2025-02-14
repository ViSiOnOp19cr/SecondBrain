import { useContent } from "../hooks/usecontent";
import { Card } from "../ui/card";
import { useState, useEffect} from "react";
import { Sidebar } from "../slidebar";
interface Card{
    id:string;
    title:string;
    link:string;
    type:string;
    createdAt:string;
}
export const YoutubeItems = () =>{
    const {content,fetchContent} = useContent();
    const [cards , setcards] = useState<Card[]>(content);
    useEffect(() => {
        setcards(content);
      }, [content]);

    const handleDelete = (id:string)=>{
        setcards(cards.filter((card)=>card.id !== id));
        fetchContent();
      };
      return (
        <div className="flex bg-gray-100">
          <Sidebar />
          <div className="flex flex-col p-4 ml-72 min-h-screen bg-gray-100">
            <div className="flex gap-4 flex-wrap">
              {cards
                .filter((card) => card.type === 'youtube')
                .map(({ title, link, id, createdAt }) => (
                  <Card
                    key={id}
                    id={id}
                    title={title}
                    link={link}
                    type="youtube"
                    createdAt={createdAt}
                    onDelete={handleDelete}
                  />
                ))}
            </div>
          </div>
        </div>
      );
}