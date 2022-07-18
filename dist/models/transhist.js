"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose=require("mongoose")
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    Firstname: {
        type: String
    },
    class_code: {
        type: String
    },
    Fee_type: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String
    },
    classId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: "coursedata"
    },
    stuId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: "studentdata"
    }
}, { timestamps: true });
const transhistory = mongoose_1.default.model("transactions", userSchema);
// module.exports={transhistory}
exports.default = transhistory;
