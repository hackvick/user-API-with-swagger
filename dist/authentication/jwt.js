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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AccessKey = "adshashbdasbh";
function generateToken(myid) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenn = jsonwebtoken_1.default.sign({ _id: myid }, AccessKey, {
            expiresIn: "1y"
        });
        return tokenn;
    });
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
function verifyToken(req, res, next) {
    try {
        const authHeader = req.header("authorization");
        console.log(authHeader, "auth");
        console.log("verifyingg token");
        const decoded = jsonwebtoken_1.default.verify(authHeader, AccessKey, (err, decode) => {
            if (err) {
                console.log(err, "deeecode");
            }
            else {
                console.log(decode, "deeecode");
            }
            next();
        });
    }
    catch (err) {
        return err;
    }
}
//   module.exports ={
//     generateToken:generateToken,
//     verifytoken:verifytoken
//   }
exports.default = { generateToken, verifyToken };
