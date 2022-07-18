import { Request,Response,NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { nextTick } from 'process';
const AccessKey="adshashbdasbh"

async function generateToken(myid: string) {
    const tokenn = jwt.sign({ _id: myid }, AccessKey
    ,{
        expiresIn : "1y"
    });
    return tokenn;
  }

  // function verifytoken(req:Request, res:Response, next:NextFunction) {
  //   const token = req.header("authorization");
  //   if (!token) {
  //       res.send("kindly add your token")   
  //   }else{
  //   const tokenslice = token.slice(7);
  //   jwt.verify(tokenslice, AccessKey, function (err, decode) {
  //     if (err) throw res.send("Your Token is expired\n Kindly Generate a new Token");
        
  //     // req.id=decode._id
  //     next();
  //   })};
  // }
 function verifyToken(req:Request,res:Response,next:NextFunction){
  try{
    const authHeader:any = req.header("authorization");
  console.log(authHeader,"auth");
    console.log("verifyingg token");
    
    const decoded:any = jwt.verify(authHeader, AccessKey,(err:any,decode:any)=>{
       if(err){
        console.log(err,"deeecode");
       }else{
        console.log(decode,"deeecode");
        
       }
       next()

    });
  }catch(err){
    return err

  }
 }



//   module.exports ={
//     generateToken:generateToken,
//     verifytoken:verifytoken
//   }
export default {generateToken,verifyToken}