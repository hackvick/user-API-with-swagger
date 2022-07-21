import express, {
  Request,
  Response,
  NextFunction,
  Application,
  response,
} from "express";
import { responsei,updatei } from "../../interface/response";
import appError from "../../utils/appError";
import getStandardResponse from "../../Helper/response";
import crypto from "crypto";
import jwt from "../../authentication/jwt";
import bcrypt from "bcrypt";
import mongoose, { ObjectId } from "mongoose";
import emailservice from "../../Services/nodemailer";
import myUserdata from "../../models/adduser";
import courseSchema from "../../models/courseSchema";
import assignclass from "../../models/assignclass";
import { genHash } from "../../utils/password"
import {
  Route,
  Controller,
  Tags,
  Security,
  Post,
  Body,
  Get,
  Query,
  Header,
  Delete,
  UploadedFile,
  Patch,Example
} from "tsoa";
import { request } from "http";
import sendMail from "../../Services/nodemailer";

// import IResponse from "../../utils/iResponse"



const app = express();

class ExpressClass {
  req: Request;
  res: Response;
  next: NextFunction;
  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
  }
  // sendResponse(data:any,message:string,statusCode:number){
  //   this.res.json(getStandardResponse(statusCode,message,data));
  // }
  // error(error:Error){
  //     console.log("hgjk",error.message);
  // }
}
@Tags("USER API's")
@Route()
export class Admin extends Controller {
  
  @Post("/admin/user/create")
  @Example
  ({
    userRoll: 3,
    Password: "password123",
    Phone: 9066665270,
    Email: "joesung@rediffmail.com",
    LastName: "sung",
    FirstName: "joe"
  })
  public async adduser(
    @Body()
    request: {
      FirstName: string;
      LastName: string;
      Email: string;
      Phone: number;
      Password: string;
      userRoll: number;
    }
  ) {
    try {
      var currentime: Date = new Date();
      var year: number = currentime.getFullYear();
      const ll: string = year.toString(10).slice(-2);
      const usedata: number = await myUserdata.find({ userRoll: 3 }).count();
      const num = String(usedata).padStart(2, "0");
      const username: string = "PR" + ll + num;
      const data: any = request;
      console.log(data);

      data.username = username;
      let data1: {} | null = await myUserdata.findOne({ Email: request.Email });
      if (data1) {
        throw new appError("User already exist", 409);
      } else {
        const myotp = Math.floor(1000 + Math.random() * 9000);
        console.log(myotp, "myotp");

        Object.assign(data, { otp: myotp });
        console.log(data.Password);
        
        // const passwordHash = genHash(data.Password)
        
        // console.log(passwordHash,"pwd");
        
        // Object.assign(data, { Password: passwordHash });
        await new myUserdata(data).save();
        sendMail(request.FirstName, request.Email, myotp);
        delete data.Password;
        return getStandardResponse(
          201,
          "User registered successfully",
          "Success"
        );
      }
    } catch (error) {
      return { errors: error };
    }
  }

  // ====================Login=================
  
  @Post("admin/user/login")
  @Example
  ({
    Lemail: "user6@gmail.com",
    Lpassword: "user123",
  })
  async login(@Body() request: { Lemail: string; Lpassword: string }):Promise<responsei|object> {
    try {
      const loginuser: any = await myUserdata.findOne({
        Email: request.Lemail,
      });

      if (!loginuser) {
        throw new appError("User doesn't exist", 404);
      } else {
        const myid: string = loginuser._id;

        if (await bcrypt.compare(request.Lpassword, loginuser.Password)) {
          const token = await jwt.generateToken(myid);

          if (loginuser.userRoll === 1) {
            return getStandardResponse(
              200,
              `welcome to admin Panel ${loginuser.FirstName}`,
              token
            );
          } else if (loginuser.userRoll == 2) {
            return getStandardResponse(
              200,
              `welcome to staff Panel ${loginuser.FirstName}`,
              token
            );
          } else {
            return getStandardResponse(
              200,
              `welcome to student Panel ${loginuser.FirstName}`,
              token
            );
          }
        } else {
          throw new appError("user not matched", 404);
        }
      }
    } catch (error) {
      return { errors: error }
    }
  }
  // ============================Verify User ===============================

  @Post("/admin/user/verifyotp")
  @Example
  ({
    email: "user8@gmail.com",
    otp: "2597",
  })
  async matchmyotp(
    @Body() request: { email: string; otp: number }
  ):Promise<responsei|object> {
    try {
      let data: any = await myUserdata.findOne({ Email: request.email });
      if (data.otp == request.otp) {
        let userData = await myUserdata.updateOne(
          { _id: data._id },
          { $set: { IsVerified: true } }
        );
        const username = data.FirstName;
        return getStandardResponse(
          200,
          `You are verified ${username}, Please return to login`,
          "Success"
        );
        //  ("You are now Verified Please return to login");
      } else {
        // return ("wrong Otp");
        throw new appError("wrong otp", 404);
      }
    } catch (error) {
      console.log(error, "catch side");
      return { errors: error };
    }
  }

  // ================Protected route===================
 
  @Security("Bearer")
  @Get("/admin/user/allusers/protected")

  async protected() :Promise<responsei|object>{
    try {
      console.log("there");

      const data = await myUserdata.find();
      console.log(data, "gh");

      return data;
    } catch (error) {
      return { errors: error };
    }
  }

  //===================== Forgot Password send Mail=======================

  @Security("Bearer")
  async mailer(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const data: any = await myUserdata.findOne({ Email: email });
      if (!data) {
        throw new appError("Email not Registered", 404);
      } else {
        const otpcode = Math.floor(100000 + Math.random() * 900000);
        await myUserdata.updateOne(
          { Phone: data.Phone },
          { $set: { otp: otpcode } }
        );
        sendMail(data.FirstName, email, otpcode);
        res.send(`Your Mail has been sent to ${email}`);
      }
    } catch (error) {
      return { errors: error };
    }
  }

  //===================== Forgot Password Match otp =================================
  
  @Security("Bearer")
  @Post("/admin/user/forgotpassword/matchotp")
  @Example({
    newotp : 2597,
    newpassword : "user234"
  })
  async chngpwd(
    @Query() email: any,
    @Body() request: { newotp: number; newpassword: string }
  ):Promise<responsei|object> {
    try {
      const data: any = await myUserdata.findOne({ Email: email.email });
      console.log(data, "data");
      console.log(data.otp, "otp");
      const salt= await bcrypt.genSalt(10)
        const hashedPwd= await bcrypt.hash(request.newpassword,salt)
      console.log(hashedPwd,"hashe");
      
      if (data.otp == request.newotp) {
        await myUserdata.updateOne(
          { otp: data.otp },
          { $set: { Password: hashedPwd } }
        );
        return getStandardResponse(
          204,
          "Password Updated Successfully",
          "success"
        );
      } else {
        throw new appError("Wrong otp", 404);
      }
    } catch (error) {
      return { errors: error };
    }
  }
  // ============================Delete User=====================
  
  @Security("Bearer")
  @Delete("/admin/user/delete")
  @Example({
    id:"62a9d03be95d92b405381c70"
  })
  async deleteuser(@Query() id: any) :Promise<responsei|object>{
    try {
      const data: unknown = await myUserdata.findByIdAndDelete({ _id: id.id });
      const data3 = "Successfull";
      if (!data) {
        throw new appError("Wrong Id", 400);
      } else {
        return getStandardResponse(204, "User Deleted Successfully", data3);
      }
    } catch (error) {
      return {errors:error};
    }
  }

  // ============================update user=========================

  @Security("Bearer")
  @Patch("/admin/user/update")
  @Example({
    id:"62a9d03be95d92b405381c70",
    FirstName: "Rajat"
  },)
  async updateuser(@Query() id: any, @Body() request: { mydata: any }):Promise<responsei|object> {
    const options = { new: true };
    console.log(request.mydata, "mydata");
    

    const updates: updatei = request.mydata;
    const result: unknown = await myUserdata.findByIdAndUpdate(
      id.id,
      updates,
      options
    )
    
    
    try {
      if (request.mydata.Password) {
        const salt= await bcrypt.genSalt(10)
          const hashedPwd= await bcrypt.hash(request.mydata.Password,salt)
          await myUserdata.updateOne(
            { _id: id.id },
            { $set: { Password: hashedPwd } })
      };
      if (!result) {
        throw new appError("Wrong id", 400);
      }
      return getStandardResponse(204, "User Updated Successfully", "success");
    } catch (error) {
      return { errors: error };
    }
  }


  // ======================Get class names=====================
 
  @Security("Bearer")
  @Get("/admin/classes")
  public async getclass() {
    try {
      let fetchclass = await courseSchema.find().select("Class");
      console.log("controller side");

      return getStandardResponse(200, "Classes", fetchclass);

      //   {
      //   statusCode:200,
      //   message: "Classes",
      //   data: fetchclass
      //  }

      // let fetchclass = await courseSchema.find().select("Class");
      // res.json(getStandardResponse(200,"Classes",fetchclass))
    } catch (error) {
      // this.next(error)
      return error;
    }
  }


}
// export default Admin;

//  let  Adminobj= new Admin()
//  export default Adminobj



//   ==============================================================