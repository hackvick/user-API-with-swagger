"use strict";
// const mongoose= require("mongoose")
// const bcrypt = require("bcrypt")
// const schema=mongoose.Schema
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userschema = new mongoose_1.default.Schema({
    FirstName: {
        type: String,
        // required:true
    },
    LastName: {
        type: String,
        // required:true
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        // required:true
    },
    Password: {
        type: String,
        // required:true
    },
    IsVerified: {
        type: String,
        default: false
    },
    // otp:{
    //     type:Number
    // },
    IsDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
// userschema.pre('save',async function(next){
//     try {
//         const salt= await bcrypt.genSalt(10)
//         const hashedPassword= await bcrypt.hash(this.Password,salt)
//         this.Password= hashedPassword
//         console.log(this,"this");
//         next()        
//     } catch (error) {
//         next(error)
//     }
// })
const Userdetails = mongoose_1.default.model("oldsign", userschema);
exports.default = { Userdetails };
