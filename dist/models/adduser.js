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
// const mongoose= require("mongoose")
// const bcrypt = require("bcrypt")
// const { required } = require("nodemon/lib/config")
// const schema=mongoose.Schema
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userschema = new mongoose_1.default.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    Email: {
        type: String,
        required: [true, "email is required"],
        // unique: [true,"Phome number should be unique"],
    },
    Phone: {
        type: Number,
        required: [true, "Phone is required"],
        unique: true,
    },
    Password: {
        type: String,
        // required:true,
    },
    // Mother_Name:{
    //     type:String
    // },
    // Father_Name:{
    //     type:String
    // },
    // Parent_Pnum:{
    //     type:Number,
    // },
    otp: {
        type: Number
    },
    IsVerified: {
        type: String,
        default: false
    },
    userRoll: {
        type: Number,
        enum: [1, 2, 3],
        required: true
    },
    IsDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
// error:Error
userschema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(this.Password, salt);
            this.Password = hashedPassword;
            console.log(this, "this");
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
const myUserdata = mongoose_1.default.model("userdata", userschema);
exports.default = myUserdata;
// module.exports = myUserdata
