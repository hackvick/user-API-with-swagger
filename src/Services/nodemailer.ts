// const { signup } = require("../conroller/v1/usercontroller");
// const signupuser= require("../models/signupuser")
// const mongoose = require("mongoose")
// const nodemail=require("nodemailer")


import signupuser from "../models/signupuser"
import mongoose from "mongoose"
import nodemail from "nodemailer"
// exports.sendMail=sendMail;
// module.exports = {sendMail:sendMail}
export default sendMail
    
    
    
    async function sendMail(FirstName:string,email:any,otpcode:number){

    
    const transporter= nodemail.createTransport({
    
        host: "smtp.gmail.com",
        port:587,
        secure: false,
        auth:
        {
        user: "vickyhasija07@gmail.com",
        pass: "vicky0001"
        }
    });
    const data:any = await signupuser.Userdetails.findOne({Email:email})
    console.log(data);
    
    const options={
      from:"vickyhasija07@gmail.com",
      to: email,
      subject:"Verify Your Account",
      text:`Hey ${FirstName}, Your Otp is + ${otpcode}`
    }
    
    transporter.sendMail(options,function(err,data){
    
      if(err){
          console.log(err)
          
      }else{
      console.log(  "sent",data.response);
      }
    });
    }

