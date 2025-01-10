"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1', routes_1.default);
app.listen(3000, () => {
    console.log('server is running on port 3000');
    mongoose_1.default.connect('mongodb+srv://visionop192004:GhPUF7$y@mern.h89pu.mongodb.net/brainly');
});
