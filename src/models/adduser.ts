// const mongoose= require("mongoose")
// const bcrypt = require("bcrypt")
// const { required } = require("nodemon/lib/config")
// const schema=mongoose.Schema
import mongoose,{ Document } from "mongoose"
import bcrypt from "bcrypt"
// import schema from
interface useri extends Document{
    FirstName:string;
    LastName:string;
    username:string;
    Email:string;
    Phone:number;
    Password:string;
    IsVerified:string;
    userRoll:number;
    IsDeleted:boolean
}

const userschema = new mongoose.Schema({
    FirstName:{
        type: String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    username:{
        type:String,
    },
    Email:{
        type:String,
        required:[true,"email is required"],
        // unique: [true,"Phome number should be unique"],

    },
    
    Phone:{
        type:Number,
        required:[true,"Phone is required"],
        unique: true,
    },
    Password:{
        type:String,
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
    otp:{
        type:Number
    },
    IsVerified:{
        type:String,
        default:false
    },
    userRoll:{
        type:Number,
        enum:[1,2,3],
        required:true
    },
    IsDeleted:{
        type:Boolean,
        default:false
    },    
},
{timestamps:true})

// error:Error
userschema.pre('save',async function(next){
    try {
        const salt= await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(this.Password,salt)
        this.Password= hashedPassword
        console.log(this,"this");
        next()        
    } catch (error:any) {
        next(error)
        
    }
})
const myUserdata= mongoose.model<useri>("userdata",userschema)
export default myUserdata
// module.exports = myUserdata