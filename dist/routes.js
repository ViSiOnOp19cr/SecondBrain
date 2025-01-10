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
const user = express_1.default.Router();
const userSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "username is requires"),
    password: zod_1.z.string().min(6, "password is required and must be 6 characters long")
});
user.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        //checking if user already exist
        const existuser = yield db_1.UserModel.findOne({ username });
        if (existuser) {
            return res.status(400).json({
                message: 'useralready exits'
            });
        }
        //hash the password
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        //creatig new user
        db_1.UserModel.create({
            username,
            password: hashpassword
        });
        res.status(201).json({
            message: 'user created'
        });
    }
    catch (e) {
        res.status(500).json({
            message: 'something went wrong'
        });
    }
}));
user.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (e) {
    }
}));
user.post('/content', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (e) {
    }
}));
user.get('/content', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (e) {
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
