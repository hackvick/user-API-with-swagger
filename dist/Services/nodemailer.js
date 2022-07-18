"use strict";
// const { signup } = require("../conroller/v1/usercontroller");
// const signupuser= require("../models/signupuser")
// const mongoose = require("mongoose")
// const nodemail=require("nodemailer")
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
const signupuser_1 = __importDefault(require("../models/signupuser"));
const nodemailer_1 = __importDefault(require("nodemailer"));
// exports.sendMail=sendMail;
// module.exports = {sendMail:sendMail}
exports.default = sendMail;
function sendMail(FirstName, email, otpcode) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "vickyhasija07@gmail.com",
                pass: "vicky0001"
            }
        });
        const data = yield signupuser_1.default.Userdetails.findOne({ Email: email });
        console.log(data);
        const options = {
            from: "vickyhasija07@gmail.com",
            to: email,
            subject: "Verify Your Account",
            text: `Hey ${FirstName}, Your Otp is + ${otpcode}`
        };
        transporter.sendMail(options, function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("sent", data.response);
            }
        });
    });
}
