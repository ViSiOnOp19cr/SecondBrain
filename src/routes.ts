import express from 'express';
import {UserModel} from './db';
const user = express.Router();

user.post('/signup',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    UserModel.create({
        username:username,
        password:password
    })

    res.json({
        message:"User created"
    })
});

user.post('/signin',(req,res)=>{
   
});

user.post('/content',(req,res)=>{

});

user.get('/content',(req,res)=>{

});

user.delete('/content', (req,res)=>{

});

user.post('/brain/share',(req,res)=>{

});

user.get('/brain/share', (req,res)=>{

});

export default user;