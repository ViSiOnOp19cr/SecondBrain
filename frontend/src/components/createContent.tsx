
import { Cross } from '../assets/cross';
import { Button } from './ui/button';
export function CreateContent({open,onClose}){
    
    return (
        <div>
            {open && <div className="w-screen h-screen bg-slate-200 fixed top-0 left-0 opacity-60
            flex justify-center">
                <div className ="flex justify-center items-center">
                    <span className = "bg-white opacity-100 p-4 rounded w-96">
                        <div className="flex justify-end">
                            <div onClick={onClose}>
                                <Cross/>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-center"><Input placeholder="Title"/></div>
                            <div className="flex justify-center">  <Input placeholder="Link"/></div>
                        </div>
                        <div className="flex justify-center">
                            <Button varient="secondary" text="submit" size="md"></Button>
                        </div>
                    </span>
                </div>
            </div>}
        </div>
    )
}

function Input({onChange, placeholder}:{onChange:()=>void}){
    return (
        <div>
            <input placeholder = {placeholder} type={"text"} className="px-4 py-2 border rounded m-2" onChange={onChange}></input>
        </div>
    )
}