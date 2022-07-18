// const mongoose= require("mongoose")
// const bcrypt = require("bcrypt")
// const schema=mongoose.Schema

import mongoose,{Document} from "mongoose"
import bcrypt from "bcrypt"

interface signupuseri extends Document{
    FirstName:string;
    LastName:string;
    Email:string;
    Phone:number;
    Password:string;
    IsVerified:string



}

const userschema = new mongoose.Schema({
    FirstName:{
        type: String,
        // required:true
    },
    LastName:{
        type:String,
        // required:true
    },
    Email:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        // required:true
    },
    Password:{
        type:String,
        // required:true
    },
    IsVerified:{
        type:String,
        default:false
    },
    // otp:{
    //     type:Number
    // },

    IsDeleted:{
        type:Boolean,
        default:false
    }

    
},
{timestamps:true})


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


const Userdetails= mongoose.model<signupuseri>("oldsign",userschema)
export default {Userdetails}