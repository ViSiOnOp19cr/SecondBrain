import { Sidebaritem } from "./sidebaritem";
import { Twitter } from "../assets/twitter";
import { Video } from "../assets/video";
import { Brainicon } from "../assets/brain";
import { useNavigate } from "react-router-dom";

import { Home } from "../assets/home";
export function Sidebar(){
    const navigate = useNavigate();
    const handletwitter = () =>{
        navigate("/twitter")
    }
    const handleyoutube = () =>{
        navigate("/youtube")
    }
    const handledashboard = ()=>{
        navigate("/dashboard")
    }
    return (
        <div className="h-screen bg-white border-r w-72 fixed
        left-0 top-0 pl-4">
            <div className="flex text-2xl pt-8 items-center">
                <div className="pr-2 text-purple-500 ml-2">
                    <Brainicon/>
                </div>
                Second Brain
            </div>
            <div className="pt-8 pl-4">
                <Sidebaritem text="Dashboard" icon={<Home/>} onClick={handledashboard}/>
                <Sidebaritem text="Twitter" icon={<Twitter/>} onClick={handletwitter}/>
                <Sidebaritem text="Youtube" icon={<Video/>} onClick={handleyoutube}/>
                
            </div>
        </div>
    )
}