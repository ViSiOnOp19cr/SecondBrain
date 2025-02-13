import { Button } from "../components/ui/button";
import { Plusicon } from "../assets/Plusicon";
import { ShareIcon } from "../assets/ShareIcon";
import { Card } from "../components/ui/card";
import { CreateContent } from "../components/createContent";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/slidebar";
import { useContent } from "./hooks/usecontent";
import { BACKEND_URL } from "../config";
import axios from "axios";
interface Card{
  id:string;
  title:string;
  link:string;
  type:string;
}
export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const {content,fetchContent} = useContent();
  const [cards , setcards] = useState<Card[]>(content);

  useEffect(()=>{
    setcards(content);
  },[content]);

  const handleDelete = (id:string)=>{
    setcards(cards.filter((card)=>card.id !== id));
    fetchContent();
  };
  const handleCloseModal = () => {
    setModelOpen(false);
    fetchContent(); // Fetch content again to reload the page
  };
  const handleAddContent = () => {
    setModelOpen(true);
  };

  return (
    <div>
      <div>
        <Sidebar/>
      </div>
      <div className="p-4 ml-72 min-h-screen bg-gray-100 wrap">
      <CreateContent
        open={modelOpen}
        onClose={handleCloseModal}
      />
      <div className="flex justify-end gap-4">
        <Button
          onClick={handleAddContent}
          startIcon={<Plusicon />}
          size="md"
          varient="secondary"
          text="Add Content"
        />
        <Button
          onClick={async ()=>{
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
              Share:true
            },{
              headers:{
                Authorization:localStorage.getItem('token')
              }
            });
            const url = `http://localhost:5173/share/${response.data.hash}`;
            navigator.clipboard.writeText(url);
            alert("Brain copied to clipboard");
          }}
          startIcon={<ShareIcon size="lg" />}
          size="md"
          varient="primary"
          text="Share Brain"
        />
      </div>
      <div className="flex gap-4 sm? col-span-1 : col-span-4 flex-wrap">
        
        {content.map(({title,link,type,_id}) => 
            <Card
              key={_id}
              id={_id}
              title={title}
              link={link}
              type={type}
              onDelete={handleDelete}
            />)}
       
      </div>
    </div>
    </div>
  );
}


