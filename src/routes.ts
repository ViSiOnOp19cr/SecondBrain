import express,{Request,Response} from 'express';
import {ContentModel, UserModel, LinkModel} from './db';
import bcrypt from 'bcrypt';
import {z} from 'zod';
import jwt from 'jsonwebtoken';
import {random} from "./utils";
import { JWT_USER_PASSWORD } from './config';
import { usermiddlewares } from './middleware';

const user = express.Router();

const userSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

user.post('/signup', async (req, res) => {
    try {

        const { username, password } = userSchema.parse(req.body);

        const existuser = await UserModel.findOne({ username });
        if (existuser) {
            res.status(400).json({
                message: 'User already exists',
            });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            username,
            password: hashpassword,
        });

        res.status(201).json({
            message: 'User created successfully',
        });
    } catch (e) {
        console.error('Error during signup:', e);
        res.status(500).json({
            message: 'Something went wrong'
  
        });
    }
});

user.post('/signin',async (req:Request,res:Response)=>{
    try{
        const {username,password} = userSchema.parse(req.body);
        const user:any = await UserModel.findOne({
            username,
        });
        if(!user){
            res.status(400).json({
                message:'user not found'
            })
        }
        else{
            const isValid = await bcrypt.compare(password,user.password);
            if(isValid){
                const token = jwt.sign({
                    id:user._id
                },JWT_USER_PASSWORD);
                res.status(200).json({
                    token
                });
            }
            else{
                res.status(400).json({
                    message:'invalid password'
                });
            }
        }
    }catch(e){
        res.status(500).json({
            message:'something went wrong'
        });
    }
});

user.post('/content',usermiddlewares, async(req:Request,res:Response)=>{
    try{
        const link = req.body.link;
        const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        title: req.body.title,
        userId: req.userId,
        tags: []
    })
    res.json({
        message: "Content added"
    })
}
    catch(e){
        res.status(500).json({
            message:'something went wrong'
        });
    }
});

user.get('/content',usermiddlewares, async(req,res)=>{
    try{
        const userId = req.userId;
        const content = await ContentModel.find({
            userId: userId
        }).populate('userId','username');
        res.json({
            content
        });

    }catch(e){
        res.status(500).json({
            message:"something went wrong"
        });
    }
});

user.delete('/content',usermiddlewares, async (req,res)=>{
    try{
        const contentid = req.body.contentid;
        await ContentModel.deleteOne({
            _id: contentid,
            userId:req.userId
        });
        res.status(200).json({
            message:"content delted"
        });

    }catch(e){
        res.status(500).json({
            message:"something went wrong"
        });
    }

});

user.post('/brain/share',usermiddlewares, async(req,res)=>{
    try{
        const share = req.body;
        if(share){
            const existingLink = await LinkModel.findOne({
                userId:req.userId
            });
            if(existingLink){
                res.json({hash:existingLink.hash});
                return;
            }
            const hash = random(10);
            await LinkModel.create({
                userId:req.userId,
                hash
            });
            res.json({hash});
        }
        else{
            await LinkModel.deleteOne({
                userId:req.userId
            });
            res.json({
                message:"removed link"
            })
        }
    }catch(e){
        res.status(500).json({
            message:"something went wrong"
        });
    }
});

user.get('/brain/:sharelink', async(req,res)=>{
    try{
        const hash = req.params.sharelink;

        const link = await LinkModel.findOne({hash});
        if(!link){
            res.status(404).json({
                message:"Invalid shate link"
            });
            return;
        }

        const content = await ContentModel.find({
            userId:link.userId
        });
        const user = await UserModel.findOne({_id:link.userId});

        if(!user){
            res.status(404).json({message:"User not found"});
            return;
        }

        res.json({
            username:user.username,
            content
        });
    }catch(e){
        res.status(500).json({
            message:"something went wrong"
        });
    }
});

export default user;