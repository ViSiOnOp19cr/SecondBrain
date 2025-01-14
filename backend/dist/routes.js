"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const user = express_1.default.Router();
const userSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "Username is required"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
});
user.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = userSchema.parse(req.body);
        const existuser = yield db_1.UserModel.findOne({ username });
        if (existuser) {
            res.status(400).json({
                message: 'User already exists',
            });
        }
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        yield db_1.UserModel.create({
            username,
            password: hashpassword,
        });
        res.status(201).json({
            message: 'User created successfully',
        });
    }
    catch (e) {
        console.error('Error during signup:', e);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
user.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = userSchema.parse(req.body);
        const user = yield db_1.UserModel.findOne({
            username,
        });
        if (!user) {
            res.status(400).json({
                message: 'user not found'
            });
        }
        else {
            const isValid = yield bcrypt_1.default.compare(password, user.password);
            if (isValid) {
                const token = jsonwebtoken_1.default.sign({
                    id: user._id
                }, config_1.JWT_USER_PASSWORD);
                res.status(200).json({
                    token
                });
            }
            else {
                res.status(400).json({
                    message: 'invalid password'
                });
            }
        }
    }
    catch (e) {
        res.status(500).json({
            message: 'something went wrong'
        });
    }
}));
user.post('/content', middleware_1.usermiddlewares, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const link = req.body.link;
        const type = req.body.type;
        yield db_1.ContentModel.create({
            link,
            type,
            title: req.body.title,
            userId: req.userId,
            tags: []
        });
        res.json({
            message: "Content added"
        });
    }
    catch (e) {
        res.status(500).json({
            message: 'something went wrong'
        });
    }
}));
user.get('/content', middleware_1.usermiddlewares, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const content = yield db_1.ContentModel.find({
            userId: userId
        }).populate('userId', 'username');
        res.json({
            content
        });
    }
    catch (e) {
        res.status(500).json({
            message: "something went wrong"
        });
    }
}));
user.delete('/content', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (e) {
    }
}));
user.post('/brain/share', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (e) {
    }
}));
user.get('/brain/share', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (e) {
    }
}));
exports.default = user;
