"use strict";
// const express= require("express");
// const req = require("express/lib/request");
// const mongoose=require("mongoose");
// const message = require("../messages/message");
// const appError= require('../utils/appError')
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import message from "../messages/message"
const appError_1 = __importDefault(require("../utils/appError"));
function errorcreate(req, res, next) {
    // req.status=404;
    // let statusCode:any
    // const err= new Error(`Route ${req.originalUrl} not found`)
    next(new appError_1.default(`Route ${req.originalUrl} not found`, 404));
    // err.statusCode=404;
    // next(err)
}
function routeError(err, req, res, next) {
    const test = (err.message).split(":");
    let mymessage = test[2];
    console.log(err);
    if (err.code == 11000) {
        let data = new appError_1.default("duplicate Value", 409);
        res.status(data.statusCode).send({ Status: data.statusCode,
            message: data.message, stack: data.stack });
    }
    else if (err.name == "ValidationError" || err.name === "MongoServerError") {
        res.status(404).json({ success: 0,
            status: err.statusCode,
            message: mymessage,
            stack: err.stack
        });
    }
    else {
        res.status(err.statusCode).json({ success: 0,
            status: err.statusCode,
            message: err.message,
            stack: err.stack
        });
    }
    // console.log(err.err,"error");
    // console.log(err.data,"data");
    // console.log(err,"fhgjk");
    // err.statusCode=err.statusCode || 500;
    // err.status = err.status || "error"
    // res.status(err.statusCode).json({
    //     success:0,
    //     status:err.statusCode,
    //     message:err.message,
    //     stack:err.stack
    // })
    // console.log(err,"error");
    // res.status(req.status || 500).json({message:err.message})
}
// function routeError(err,req,res,next){
//     console.log(err,"error");
//     res.status(req.status || 500).json({message:err.message})
// }
// exports.errorcreate= errorcreate
// exports.routeError=routeError
exports.default = { errorcreate, routeError };
