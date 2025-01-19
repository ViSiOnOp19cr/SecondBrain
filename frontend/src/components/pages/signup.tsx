import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Brainicon } from "../../assets/brain";
import { useRef } from "react";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export function Signup(){

    const usernameref = useRef<HTMLInputElement>();
    const passwordref = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    async function handlesignup(){
        const username = usernameref.current?.value;
        const password = passwordref.current?.value;
        await axios.post(BACKEND_URL+ "/api/v1/signup",{
            
                username,
                password
            
        })
        navigate("/signin")
        alert("Signup Successfull")
    }
   

    return (
        <div className="h-screen w-screen bg-gray-200">
            <div className="flex text-2xl pt-8 items-center">
                <div className="pr-2 text-purple-500 ml-2">
                    <Brainicon/>
                </div>
                Second Brain
            </div>
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white h-72 w-60 rounded border min-w-48">
                <Input  placeholder="Username" reference={usernameref}/>
                <Input  placeholder="password" reference = {passwordref}/>
                <div className="flex justify-center pt-8">
                    <Button onClick={handlesignup} varient="secondary" text="Signup" size="md"></Button>
                </div>
            </div>
            
        </div>
        </div>
    )
}