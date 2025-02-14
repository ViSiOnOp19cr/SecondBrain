import express, { Request, Response } from 'express';
import { ContentModel, UserModel, LinkModel } from './db';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { random } from "./utils";
import { JWT_USER_PASSWORD } from './config';
import { usermiddlewares } from './middleware';

const user = express.Router();

user.post("/signup", async (req, res) => {
    // TODO: zod validation , hash the password
    const username = req.body.username;
    const password = req.body.password;
    try {
        await UserModel.create({
            username: username,
            password: password
        })
        res.json({
            message: "User signed up"
        })
    } catch (e) {
        res.status(411).json({
            message: "User already exists"
        })
    }
})
user.post("/signin", async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);
    try {
        const existingUser = await UserModel.findOne({
            username,
            password
        })
        if (existingUser) {
            const token = jwt.sign({
                id: existingUser._id
            }, JWT_USER_PASSWORD)

            res.json({
                token
            })
        } else {
            res.status(403).json({
                message: "Incorrrect credentials"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: "something went wrong"
        });
    }
})


user.post('/content', usermiddlewares, async (req: Request, res: Response) => {
    try {
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
    catch (e) {
        res.status(500).json({
            message: 'something went wrong'
        });
    }
});

user.get('/content', usermiddlewares, async (req, res) => {
    try {
        const userId = req.userId;
        const content = await ContentModel.find({
            userId: userId
        }).populate('userId', 'username');
        res.json({
            content
        });

    } catch (e) {
        res.status(500).json({
            message: "something went wrong"
        });
    }
});

user.delete('/content/:id', usermiddlewares, async (req, res) => {
    try {
        const { id } = req.params;
        await ContentModel.deleteOne({
            _id: id,
            userId: req.userId
        });
        res.status(200).json({
            message: "content delted"
        });

    } catch (e) {
        res.status(500).json({
            message: "something went wrong"
        });
    }

});

user.post('/brain/share', usermiddlewares, async (req, res) => {
    try {
        const share = req.body;
        if (share) {
            const existingLink = await LinkModel.findOne({
                userId: req.userId
            });
            if (existingLink) {
                res.json({ hash: existingLink.hash });
                return;
            }
            const hash = random(10);
            await LinkModel.create({
                userId: req.userId,
                hash
            });
            res.json({ hash });
        }
        else {
            await LinkModel.deleteOne({
                userId: req.userId
            });
            res.json({
                message: "removed link"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: "something went wrong"
        });
    }
});

user.get('/brain/share/:hash', async (req, res) => {
    try {

        const hash = req.params.hash;

        const link = await LinkModel.findOne({ hash });
        if (!link) {
            res.status(404).json({
                message: "Invalid shate link"
            });
            return;
        }

        const content = await ContentModel.find({
            userId: link.userId
        });
        const user = await UserModel.findOne({ _id: link.userId });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.json({
            username: user.username,
            content
        });
    } catch (e) {
        res.status(500).json({
            message: "something went wrong"
        });
    }
});

export default user;