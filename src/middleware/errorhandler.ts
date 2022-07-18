
// const express= require("express");
// const req = require("express/lib/request");
// const mongoose=require("mongoose");
// const message = require("../messages/message");
// const appError= require('../utils/appError')

import express, {Response,Request,NextFunction } from "express"
import mongoose from "mongoose"
// import message from "../messages/message"
import appError from "../utils/appError"


function errorcreate(req:Request,res:Response,next:NextFunction){
    // req.status=404;
    // let statusCode:any
    // const err= new Error(`Route ${req.originalUrl} not found`)
    next (new appError(`Route ${req.originalUrl} not found`,404))
    // err.statusCode=404;
    // next(err)
}

    interface Error{
        status?:number;
        code?:number;
        message?:any;
        name?:any;
        statusCode?:any;
        stack?:any
    }

function routeError(err:Error,req:Request,res:Response,next:NextFunction){
    const test=(err.message).split(":")
    

        let mymessage:string= test[2]
        console.log(err);
    if (err.code==11000 ) {
          let data= new appError ("duplicate Value",409)
          res.status(data.statusCode).send({Status:data.statusCode,
          message:data.message,stack:data.stack})
    }
    
    else if(err.name == "ValidationError"|| err.name === "MongoServerError"){
        
        res.status(404).json({success:0,
            status:err.statusCode,
            message:mymessage,
            stack:err.stack

         })

    }else{
        res.status(err.statusCode).json({success:0,
            status:err.statusCode,
            message:err.message,
            stack:err.stack

         })

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
export default {errorcreate,routeError}