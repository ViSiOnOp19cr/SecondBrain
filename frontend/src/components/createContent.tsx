import {Input} from './ui/input';
import { Cross } from '../assets/cross';
import { Button } from './ui/button';
import { useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

enum ContentType {
    Youtube="youtube",
    Twitter = "twitter"

}
export function CreateContent({open,onClose}){
    const [Type,setType] = useState(ContentType.Youtube);
    const titleref = useRef<HTMLInputElement>();
    const linkref = useRef<HTMLInputElement>();
    async function addcontent(){
        const title = titleref.current?.value;
        const link = linkref.current?.value;
        await axios.post(BACKEND_URL+"/api/v1/content",{
            title,
            link,
            type:Type
        },{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        })
        onClose();
    }
    return (
        <div>
            {open && <div>
                <div className="w-screen h-screen bg-slate-200 fixed top-0 left-0 opacity-60">

            </div>
            <div className="w-screen h-screen fixed top-0 left-0
            flex justify-center">
                <div className ="flex justify-center items-center">
                    <span className = "bg-white opacity-100 p-4 rounded w-96">
                        <div className="flex justify-end">
                            <div onClick={onClose}>
                                <Cross/>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-center"><Input reference={titleref} placeholder="Title"/></div>
                            <div className="flex justify-center">  <Input reference = {linkref} placeholder="Link"/></div>
                        </div>
                        <div className="flex justify-center gap-2 p-2">
                            <Button varient = {Type===ContentType.Youtube ? "secondary": "primary"} onClick={()=>{
                                setType(ContentType.Youtube);
                            }} text="Youtube" size="md"/>
                            <Button varient = {Type===ContentType.Twitter ? "secondary": "primary"} onClick={()=>{
                                setType(ContentType.Twitter);
                            }} text="Twitter" size="md"/>
                        </div>
                        <div className="flex justify-center">
                            <Button  onClick={addcontent} varient="secondary" text="submit" size="md"></Button>
                        </div>
                    </span>
                </div>
            </div> 
            </div>}
        </div>
    )
}
