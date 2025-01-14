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
const utils_1 = require("./utils");
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
user.delete('/content', middleware_1.usermiddlewares, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentid = req.body.contentid;
        yield db_1.ContentModel.deleteOne({
            _id: contentid,
            userId: req.userId
        });
        res.status(200).json({
            message: "content delted"
        });
    }
    catch (e) {
        res.status(500).json({
            message: "something went wrong"
        });
    }
}));
user.post('/brain/share', middleware_1.usermiddlewares, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const share = req.body;
        if (share) {
            const existingLink = yield db_1.LinkModel.findOne({
                userId: req.userId
            });
            if (existingLink) {
                res.json({ hash: existingLink.hash });
                return;
            }
            const hash = (0, utils_1.random)(10);
            yield db_1.LinkModel.create({
                userId: req.userId,
                hash
            });
            res.json({ hash });
        }
        else {
            yield db_1.LinkModel.deleteOne({
                userId: req.userId
            });
            res.json({
                message: "removed link"
            });
        }
    }
    catch (e) {
        res.status(500).json({
            message: "something went wrong"
        });
    }
}));
user.get('/brain/:sharelink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = req.params.sharelink;
        const link = yield db_1.LinkModel.findOne({ hash });
        if (!link) {
            res.status(404).json({
                message: "Invalid shate link"
            });
            return;
        }
        const content = yield db_1.ContentModel.find({
            userId: link.userId
        });
        const user = yield db_1.UserModel.findOne({ _id: link.userId });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json({
            username: user.username,
            content
        });
    }
    catch (e) {
        res.status(500).json({
            message: "something went wrong"
        });
    }
}));
exports.default = user;
