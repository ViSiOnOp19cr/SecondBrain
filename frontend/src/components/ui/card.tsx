import { ShareIcon } from "../../assets/ShareIcon";
import { Delete } from "../../assets/Delete";
import { Video } from "../../assets/video";
import { Twitter } from "../../assets/twitter";
import axios from 'axios';
import { BACKEND_URL } from "../../config";
import moment from "moment";
import { useState, useEffect } from "react";

export interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  id: string;
  createdAt: string;
  onDelete:(id:string)=>void;
}
const del = async (id:string,onDelete:(id:string) =>void) => {
  console.log(id);
  try{
    const token = localStorage.getItem('token');
    if(!token){
      throw new Error("Token not found");
    }
    await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
      headers:{
        Authorization:token
      }
    });
    alert("Content delted");
    onDelete(id);


  }catch(e){
    alert("something went wrong");
  }
};

export const Card = (props: CardProps) => {
  const [timeAgo, setTimeAgo] = useState(moment(props.createdAt).fromNow());
  useEffect(() => {
    const interval = setInterval(() => {
        setTimeAgo(moment(props.createdAt).fromNow());
    }, 60000); // Update every 60 seconds
    return () => clearInterval(interval);
}, [props.createdAt]);
  return (
    <div>
      <div
        className="p-4 bg-white rounded-md border-gray-200 max-w-72
        border"
      >
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="pr-2 text-gray-500 text-md">
              {props.type === "youtube" ? <Video /> : <Twitter />}
            </div>
            <h1>{props.title}</h1>
          </div>
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <a href={props.link}>
                <ShareIcon size="lg" />
              </a> 
            </div>
            <div onClick={() => del(props.id, props.onDelete)} className="text-gray-500 cursor-pointer hover:color:gray">
              <Delete/>
            </div>
          </div>
        </div>

        <div>
          {props.type === "youtube" && (
            <iframe
              className="pt-4 w-full"
              src={props.link.replace("watch?v=", "embed/").split("&")[0]} // Remove additional parameters
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          {props.type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={props.link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
        <div>{timeAgo}</div>
      </div>
    </div>
  );
};
