"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require("mongoose")
const mongoose_1 = __importDefault(require("mongoose"));
const url = 
// "mongodb+srv://vickyh2:mongo234@cluster0.z2xulvu.mongodb.net/?retryWrites=true&w=majority"  --- new untoch database vicky60
//  "mongodb+srv://vickyhasija1:mongo123@cluster0.xwsm3.mongodb.net/?retryWrites=true&w=majority"
"mongodb+srv://vickyhasija1:mongo123@cluster0.xwsm3.mongodb.net/?retryWrites=true&w=majority";
// "mongodb+srv://vickyhasija1:mongo123@cluster0.xwsm3.mongodb.net/?retryWrites=true&w=majority"
mongoose_1.default.connect(url);
// {
//     useUnifiedTopology: true,
//         useNewUrlParser: true,
//         autoIndex: true,}
const connect = mongoose_1.default.connection;
// module.exports={connect}
exports.default = connect;
