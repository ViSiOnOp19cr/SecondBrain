import { Button } from "./components/ui/button";
import { Plusicon } from "./assets/Plusicon";
import { ShareIcon } from "./assets/ShareIcon";
import { Card } from "./components/card";
import { CreateContent } from "./components/createContent";
import { useState } from "react";
import { Sidebar } from "./components/slidebar";
function App() {
  const [modelOpen, setModelOpen] = useState(false);
  return (
    <div>
      <div>
        <Sidebar/>
      </div>
      <div className="p-4 ml-72 min-h-screen bg-gray-100">
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
      <div className="flex gap-4 sm? col-span-1 : col-span-4 ">
        <Card
          type="twitter"
          link="https://x.com/Chandancr_19/status/1861675520842440858"
          title={"Testing frontend"}
        />
        <Card
          type="youtube"
          link="https://www.youtube.com/watch?v=-uTbPFSFogo&t=441s"
          title={"Testing youtube frontend"}
        />
      </div>
    </div>
    </div>
  );
}

export default App;
