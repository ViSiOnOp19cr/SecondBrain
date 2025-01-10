import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import user from './routes';
const app = express();
app.use(express.json());
app.use('/api/v1', user);

app.listen(3000,()=>{
    console.log('server is running on port 3000');
    mongoose.connect('mongodb+srv://visionop192004:GhPUF7$y@mern.h89pu.mongodb.net/brainly')
})