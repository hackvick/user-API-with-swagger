// const mongoose=require("mongoose")
// const schema= mongoose.Schema
import mongoose,{Document, ObjectId} from "mongoose"
interface assignclassi extends Document{
    userId:ObjectId;
    classId:ObjectId;
    Firstname:string;
    Lastname:string;
    rollNum:string;
    Class:number;
    monthlyfee:number;
    class_code:string;
    Admission_Fee:number;
    total_Due:number;
    pendingFee:string;
    isActive:boolean;

}
// import schema from mongoose.Schema
const userschema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,ref:"userdata"
        // required:true
    },
    classId:{
        type:mongoose.Schema.Types.ObjectId,ref:"coursedata"
    },
    Firstname:{
        type:String,
        
    },
    Lastname:{
        type:String
    },
    rollNum:{
        type:String
    },
    Class:{
        type:Number,
        required:true
    },
    monthlyfee:{
        type:Number,
        required:true
    },
    class_code:{
        type:String,
        required:true
    },
    Admission_Fee:{
        type:Number,
        required:true
    },
    total_Due:{
        type:Number,
        default:0
    },
    pendingFee:{
        type:String,
        default:false
    },
    isActive:{
        type:String,
        default:false
    }
},{timestamps:true})
const classassign=  mongoose.model<assignclassi>("studentdata",userschema)
// module.exports={classassign}
export default classassign