import express, { Request, Response, NextFunction } from "express";

import FileUpload from "../Services/multer";
import appError from "../utils/appError";


import jwt from "../authentication/jwt";
import {
  Route,
  Controller,
  Tags,
  Security,
  Post,
  Body,
  Get,
  Query,
  Delete,
  UploadedFile,
} from "tsoa";

// const express=require('express');
// const upload  = require('../Services/index');
// const usercontroller = require('../conroller/v1/usercontroller');
// const  Adminobj= require('../conroller/v1/ Adminobj')
import { Admin } from "../conroller/v1/admincontroller";
import { verify } from "jsonwebtoken";
const router = express.Router();



router.post(
  "/admin/user/create",
  FileUpload.single("img"),
  async (req: Request, res: Response, next: NextFunction) => {
    const { FirstName, LastName, Email, Phone, Password, userRoll } = req.body;
    const controller = new Admin();
    const response: any = await controller.adduser({
      FirstName,
      LastName,
      Email,
      Phone,
      Password,
      userRoll,
    });
    if (response.errors) {
      console.log("error💀💀💀💀");
      next(response.errors);
    } else {
      res.send(response);
    }
  }
);

router.post(
  "/admin/user/login",
  FileUpload.single("img"),
  async (req: Request, res: Response, next: NextFunction) => {
    const { Lemail, Lpassword } = req.body;
    // const Lemail = req.body.Lemail
    // const Lpassword =req.body.Lpassword
    console.log({ Lemail, Lpassword });

    const controller = new Admin();
    const response: any = await controller.login({ Lemail, Lpassword });
    if (response.errors) {
      console.log("error💀💀💀💀");
      next(response.errors);
    } else {
      res.send(response);
    }
  }
);

router.delete(
  "/admin/user/delete",
  FileUpload.single("img"),
  jwt.verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id }: any = req.query;
    const controller = new Admin();
    const response: any = await controller.deleteuser({ id });
    if (response.errors) {
      console.log("error💀💀💀💀");
      next(response.errors);
    } else {
      res.send(response);
    }
  }
);

router.post(
  "/admin/user/verifyotp",
  FileUpload.single("img"),
  async (req: Request, res: Response, next: NextFunction) => {
    const { otp, email } = req.body;
    const controller = new Admin();
    const response: any = await controller.matchmyotp({ otp, email });

    console.log("response", response, "response");
    // console.log(typeof response);
    console.log(response.errors, "app ka error");

    if (response.errors) {
      console.log("error💀💀💀💀");
      next(response.errors);
    } else {
      res.send(response);
    }
  }
);

router.patch(
  "/admin/user/update",
  FileUpload.single("img"),
  FileUpload.single("img"),
  jwt.verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const id: any = req.query;
    console.log(id, "id");

    const mydata = req.body;
    console.log(mydata, "mydatai");

    const controller = new Admin();
    const response: any = await controller.updateuser(id, { mydata });
    if (response.errors) {
      console.log("error💀💀💀💀");
      next(response.errors);
    } else {
      res.send(response);
    }
  }
);

router.post(
  "/admin/user/forgotpassword/matchotp",
  jwt.verifyToken,
  FileUpload.single("img"),
  async (req: Request, res: Response, next: NextFunction) => {
    const email = req.query;
    const { newotp, newpassword } = req.body;
    const controller = new Admin();
    const response: any = await controller.chngpwd(email, {
      newotp,
      newpassword,
    });
    if (response.errors) {
      console.log("error💀💀💀💀");
      next(response.errors);
    } else {
      res.send(response);
    }
  }
);

router.get(
  "/admin/user/allusers/protected",
  jwt.verifyToken,
  FileUpload.single("img"),
  async (req: Request, res: Response, next: NextFunction) => {
    const controller = new Admin();

    console.log("here");

    const response: any = await controller.protected();
    console.log(response, "ressssss");
    if (response.errors) {
      console.log("error💀💀💀💀");
      next(response.errors);
    } else {
      res.send(response);
    }
  }
);


router.get(
  "/admin/classes",
  FileUpload.single("img"),
  jwt.verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const controller = new Admin();
    const response: any = await controller.getclass();
    if (response.errors) {
      console.log("error💀💀💀💀");
      next(response.errors);
    } else {
      res.send(response);
    }
  }
);

export default router;
