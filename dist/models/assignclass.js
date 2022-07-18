"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose=require("mongoose")
// const schema= mongoose.Schema
const mongoose_1 = __importDefault(require("mongoose"));
// import schema from mongoose.Schema
const userschema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: "userdata"
        // required:true
    },
    classId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: "coursedata"
    },
    Firstname: {
        type: String,
    },
    Lastname: {
        type: String
    },
    rollNum: {
        type: String
    },
    Class: {
        type: Number,
        required: true
    },
    monthlyfee: {
        type: Number,
        required: true
    },
    class_code: {
        type: String,
        required: true
    },
    Admission_Fee: {
        type: Number,
        required: true
    },
    total_Due: {
        type: Number,
        default: 0
    },
    pendingFee: {
        type: String,
        default: false
    },
    isActive: {
        type: String,
        default: false
    }
}, { timestamps: true });
const classassign = mongoose_1.default.model("studentdata", userschema);
// module.exports={classassign}
exports.default = classassign;
