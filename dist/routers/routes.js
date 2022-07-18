"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../Services/multer"));
const jwt_1 = __importDefault(require("../authentication/jwt"));
// const express=require('express');
// const upload  = require('../Services/index');
// const usercontroller = require('../conroller/v1/usercontroller');
// const  Adminobj= require('../conroller/v1/ Adminobj')
const admincontroller_1 = require("../conroller/v1/admincontroller");
const router = express_1.default.Router();
router.post("/admin/user/create", multer_1.default.single("img"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { FirstName, LastName, Email, Phone, Password, userRoll } = req.body;
    const controller = new admincontroller_1.Admin();
    const response = yield controller.adduser({
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
    }
    else {
        res.send(response);
    }
}));
router.post("/admin/user/login", multer_1.default.single("img"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Lemail, Lpassword } = req.body;
    // const Lemail = req.body.Lemail
    // const Lpassword =req.body.Lpassword
    console.log({ Lemail, Lpassword });
    const controller = new admincontroller_1.Admin();
    const response = yield controller.login({ Lemail, Lpassword });
    if (response.errors) {
        console.log("error💀💀💀💀");
        next(response.errors);
    }
    else {
        res.send(response);
    }
}));
router.delete("/admin/user/delete", multer_1.default.single("img"), jwt_1.default.verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const controller = new admincontroller_1.Admin();
    const response = yield controller.deleteuser({ id });
    if (response.errors) {
        console.log("error💀💀💀💀");
        next(response.errors);
    }
    else {
        res.send(response);
    }
}));
router.post("/admin/user/verifyotp", multer_1.default.single("img"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, email } = req.body;
    const controller = new admincontroller_1.Admin();
    const response = yield controller.matchmyotp({ otp, email });
    console.log("response", response, "response");
    // console.log(typeof response);
    console.log(response.errors, "app ka error");
    if (response.errors) {
        console.log("error💀💀💀💀");
        next(response.errors);
    }
    else {
        res.send(response);
    }
}));
router.patch("/admin/user/update", multer_1.default.single("img"), multer_1.default.single("img"), jwt_1.default.verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query;
    console.log(id, "id");
    const mydata = req.body;
    console.log(mydata, "mydatai");
    const controller = new admincontroller_1.Admin();
    const response = yield controller.updateuser(id, { mydata });
    if (response.errors) {
        console.log("error💀💀💀💀");
        next(response.errors);
    }
    else {
        res.send(response);
    }
}));
router.post("/admin/user/forgotpassword/matchotp", jwt_1.default.verifyToken, multer_1.default.single("img"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query;
    const { newotp, newpassword } = req.body;
    const controller = new admincontroller_1.Admin();
    const response = yield controller.chngpwd(email, {
        newotp,
        newpassword,
    });
    if (response.errors) {
        console.log("error💀💀💀💀");
        next(response.errors);
    }
    else {
        res.send(response);
    }
}));
router.get("/admin/user/allusers/protected", jwt_1.default.verifyToken, multer_1.default.single("img"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new admincontroller_1.Admin();
    console.log("here");
    const response = yield controller.protected();
    console.log(response, "ressssss");
    if (response.errors) {
        console.log("error💀💀💀💀");
        next(response.errors);
    }
    else {
        res.send(response);
    }
}));
router.get("/admin/classes", multer_1.default.single("img"), jwt_1.default.verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new admincontroller_1.Admin();
    const response = yield controller.getclass();
    if (response.errors) {
        console.log("error💀💀💀💀");
        next(response.errors);
    }
    else {
        res.send(response);
    }
}));
exports.default = router;
