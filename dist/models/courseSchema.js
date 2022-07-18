"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose=require("mongoose")
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    Class: {
        type: Number,
        required: true
    },
    Admission_Fee: {
        type: Number,
        required: true
    },
    class_code: {
        type: String,
        required: true
    },
    Monthly_Fee: {
        type: Number,
        required: true
    }
});
const courseSchema = mongoose_1.default.model("coursedata", userSchema);
// module.exports= {courseSchema}
exports.default = courseSchema;
