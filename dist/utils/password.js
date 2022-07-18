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
Object.defineProperty(exports, "__esModule", { value: true });
exports.genHash = void 0;
const bcrypt = require('bcrypt');
// export const genHash = (stringValue: string): Promise<string> => {
//     return new Promise((res, rej) => {
function genHash(value) {
    return __awaiter(this, void 0, void 0, function* () {
        //         try {
        //         bcrypt.genSalt(10, function (err: any, salt: string) {
        //             if (err) {
        //                 console.log("error 1");
        //                 throw new appError (err.message,404)
        //             }
        //             bcrypt.hash(value, salt, async (err: any, hash: string) => {
        //                 if (err) {
        //                     console.log("error 2");
        //                     return (err.message)
        //                 }
        //                 console.log("no_error");
        //                 return (hash);
        //             });
        //         ;
        //     })
        // } catch (error) {
        // }
        // =====
        try {
            console.log(value, "password sis");
            const salt = yield bcrypt.genSalt(10);
            console.log(salt, "salt");
            const hashedPassword = yield bcrypt.hash(value, salt);
            console.log(hashedPassword, "hasshed");
            // value= hashedPassword
            // console.log(,"hush");
            // console.log(this,"this");
            // next()   
            return hashedPassword;
        }
        catch (error) {
            return (error);
        }
    });
}
exports.genHash = genHash;
