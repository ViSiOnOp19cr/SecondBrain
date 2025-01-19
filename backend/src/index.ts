import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import user from './routes';
import cors from 'cors';

const app = express();


app.use(express.json());
app.use(cors());
app.use('/api/v1', user);

app.listen(3000,async ()=>{
    console.log('server is running on port 3000');
    await mongoose.connect('mongodb+srv://visionop192004:GhPUF7$y@mern.h89pu.mongodb.net/brainly');
    console.log("connected to mongodb");
})