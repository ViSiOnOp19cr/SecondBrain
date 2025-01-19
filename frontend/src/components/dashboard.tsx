import { Button } from "../components/ui/button";
import { Plusicon } from "../assets/Plusicon";
import { ShareIcon } from "../assets/ShareIcon";
import { Card } from "../components/ui/card";
import { CreateContent } from "../components/createContent";
import { useState } from "react";
import { Sidebar } from "../components/slidebar";
import { useContent } from "./hooks/usecontent";

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const content = useContent();

  return (
    <div>
      <div>
        <Sidebar/>
      </div>
      <div className="p-4 ml-72 min-h-screen bg-gray-100 wrap">
      <CreateContent
        open={modelOpen}
        onClose={() => {
          setModelOpen(false);
        }}
      />
      <div className="flex justify-end gap-4">
        <Button
          onClick={() => {
            setModelOpen(true);
          }}
          startIcon={<Plusicon />}
          size="md"
          varient="secondary"
          text="Add Content"
        />
        <Button
          startIcon={<ShareIcon size="lg" />}
          size="md"
          varient="primary"
          text="Share Brain"
        />
      </div>
      <div className="flex gap-4 sm? col-span-1 : col-span-4 flex-wrap">
        
        {content.map(({title,link,type}) => 
        
            <Card
              title={title}
              link={link}
              type={type}
            />)}
       
      </div>
    </div>
    </div>
  );
}


