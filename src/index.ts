import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import user from './routes';
const app = express();

app.use('/api/v1', user);