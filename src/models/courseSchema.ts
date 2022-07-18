// const mongoose=require("mongoose")
import mongoose,{Document} from "mongoose";
// const schema = mongoose.Schema

interface coursei{
    Class:number;
    Admission_Fee:number;
    class_code:string;
    Monthly_Fee:number
}



const userSchema=new mongoose.Schema({

    Class:{
        type:Number,
        required:true
    },
    Admission_Fee:{
        type:Number,
        required:true
    },
    class_code:{
        type:String,
        required:true
    },
    Monthly_Fee:{
        type:Number,
        required:true
    }

});

const courseSchema= mongoose.model<coursei>("coursedata",userSchema)
// module.exports= {courseSchema}
export default courseSchema