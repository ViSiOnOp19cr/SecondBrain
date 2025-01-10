import express,{Request,Response} from 'express';
import {UserModel} from './db';
import bcrypt from 'bcrypt';
import {z} from 'zod';
import jwt from 'jsonwebtoken';

const user = express.Router();

const userSchema = z.object({
    username:z.string().min(1,"username is requires"),
    password:z.string().min(6,"password is required and must be 6 characters long")
});
user.post('/signup', async (req:Request, res:Response):Promise<any> => {
    
    try{
        const {username,password} = userSchema.parse(req.body);
        //checking if user already exist
        const existuser = await UserModel.findOne({username});
        if(existuser){
            return res.status(400).json({
                message:'useralready exits'
                
            })
            
        }
        //hash the password
        const hashpassword = await  bcrypt.hash(password,10);
        //creatig new user
        
            UserModel.create({
                username,
                password:hashpassword
            });
            res.status(201).json({
                message:'user created'
            })
        
    }catch(e){
        res.status(500).json({
            message:'something went wrong'

        });
    }
});

user.post('/signin',async (req,res)=>{
    try{

    }catch(e){

    }
   
});

user.post('/content',async(req,res)=>{
    try{

    }catch(e){

    }

});

user.get('/content',async(req,res)=>{
    try{

    }catch(e){

    }

});

user.delete('/content',async (req,res)=>{
    try{

    }catch(e){

    }

});

user.post('/brain/share',async(req,res)=>{
    try{

    }catch(e){

    }

});

user.get('/brain/share', async(req,res)=>{
    try{

    }catch(e){

    }
});

export default user;