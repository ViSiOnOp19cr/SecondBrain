import { useContent } from "../hooks/usecontent";
import { Card } from "../ui/card";
import { useState, useEffect} from "react";
import { Sidebar } from "../slidebar";
interface Card{
    id:string;
    title:string;
    link:string;
    type:string;
}
export const TwitterItems = () =>{
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
                .filter((card) => card.type === 'twitter')
                .map(({ title, link, id }) => (
                  <Card
                    key={id}
                    id={id}
                    title={title}
                    link={link}
                    type="twitter"
                    onDelete={handleDelete}
                  />
                ))}
            </div>
          </div>
        </div>
      );
}