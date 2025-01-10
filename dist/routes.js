"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const user = express_1.default.Router();
user.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db_1.UserModel.create({
        username: username,
        password: password
    });
    res.json({
        message: "User created"
    });
});
user.post('/signin', (req, res) => {
});
user.post('/content', (req, res) => {
});
user.get('/content', (req, res) => {
});
user.delete('/content', (req, res) => {
});
user.post('/brain/share', (req, res) => {
});
user.get('/brain/share', (req, res) => {
});
exports.default = user;
