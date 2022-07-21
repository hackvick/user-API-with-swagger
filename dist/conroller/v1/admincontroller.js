"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.Admin = void 0;
const express_1 = __importDefault(require("express"));
const appError_1 = __importDefault(require("../../utils/appError"));
const response_1 = __importDefault(require("../../Helper/response"));
const jwt_1 = __importDefault(require("../../authentication/jwt"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const adduser_1 = __importDefault(require("../../models/adduser"));
const courseSchema_1 = __importDefault(require("../../models/courseSchema"));
const tsoa_1 = require("tsoa");
const nodemailer_1 = __importDefault(require("../../Services/nodemailer"));
// import IResponse from "../../utils/iResponse"
const app = (0, express_1.default)();
class ExpressClass {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
}
let Admin = class Admin extends tsoa_1.Controller {
    adduser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var currentime = new Date();
                var year = currentime.getFullYear();
                const ll = year.toString(10).slice(-2);
                const usedata = yield adduser_1.default.find({ userRoll: 3 }).count();
                const num = String(usedata).padStart(2, "0");
                const username = "PR" + ll + num;
                const data = request;
                console.log(data);
                data.username = username;
                let data1 = yield adduser_1.default.findOne({ Email: request.Email });
                if (data1) {
                    throw new appError_1.default("User already exist", 409);
                }
                else {
                    const myotp = Math.floor(1000 + Math.random() * 9000);
                    console.log(myotp, "myotp");
                    Object.assign(data, { otp: myotp });
                    console.log(data.Password);
                    // const passwordHash = genHash(data.Password)
                    // console.log(passwordHash,"pwd");
                    // Object.assign(data, { Password: passwordHash });
                    yield new adduser_1.default(data).save();
                    (0, nodemailer_1.default)(request.FirstName, request.Email, myotp);
                    delete data.Password;
                    return (0, response_1.default)(201, "User registered successfully", "Success");
                }
            }
            catch (error) {
                return { errors: error };
            }
        });
    }
    // ====================Login=================
    login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginuser = yield adduser_1.default.findOne({
                    Email: request.Lemail,
                });
                if (!loginuser) {
                    throw new appError_1.default("User doesn't exist", 404);
                }
                else {
                    const myid = loginuser._id;
                    if (yield bcrypt_1.default.compare(request.Lpassword, loginuser.Password)) {
                        const token = yield jwt_1.default.generateToken(myid);
                        if (loginuser.userRoll === 1) {
                            return (0, response_1.default)(200, `welcome to admin Panel ${loginuser.FirstName}`, token);
                        }
                        else if (loginuser.userRoll == 2) {
                            return (0, response_1.default)(200, `welcome to staff Panel ${loginuser.FirstName}`, token);
                        }
                        else {
                            return (0, response_1.default)(200, `welcome to student Panel ${loginuser.FirstName}`, token);
                        }
                    }
                    else {
                        throw new appError_1.default("user not matched", 404);
                    }
                }
            }
            catch (error) {
                return { errors: error };
            }
        });
    }
    // ============================Verify User ===============================
    matchmyotp(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield adduser_1.default.findOne({ Email: request.email });
                if (data.otp == request.otp) {
                    let userData = yield adduser_1.default.updateOne({ _id: data._id }, { $set: { IsVerified: true } });
                    const username = data.FirstName;
                    return (0, response_1.default)(200, `You are verified ${username}, Please return to login`, "Success");
                    //  ("You are now Verified Please return to login");
                }
                else {
                    // return ("wrong Otp");
                    throw new appError_1.default("wrong otp", 404);
                }
            }
            catch (error) {
                console.log(error, "catch side");
                return { errors: error };
            }
        });
    }
    // ================Protected route===================
    protected() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("there");
                const data = yield adduser_1.default.find();
                console.log(data, "gh");
                return data;
            }
            catch (error) {
                return { errors: error };
            }
        });
    }
    //===================== Forgot Password send Mail=======================
    mailer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const data = yield adduser_1.default.findOne({ Email: email });
                if (!data) {
                    throw new appError_1.default("Email not Registered", 404);
                }
                else {
                    const otpcode = Math.floor(100000 + Math.random() * 900000);
                    yield adduser_1.default.updateOne({ Phone: data.Phone }, { $set: { otp: otpcode } });
                    (0, nodemailer_1.default)(data.FirstName, email, otpcode);
                    res.send(`Your Mail has been sent to ${email}`);
                }
            }
            catch (error) {
                return { errors: error };
            }
        });
    }
    //===================== Forgot Password Match otp =================================
    chngpwd(email, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield adduser_1.default.findOne({ Email: email.email });
                console.log(data, "data");
                console.log(data.otp, "otp");
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPwd = yield bcrypt_1.default.hash(request.newpassword, salt);
                console.log(hashedPwd, "hashe");
                if (data.otp == request.newotp) {
                    yield adduser_1.default.updateOne({ otp: data.otp }, { $set: { Password: hashedPwd } });
                    return (0, response_1.default)(204, "Password Updated Successfully", "success");
                }
                else {
                    throw new appError_1.default("Wrong otp", 404);
                }
            }
            catch (error) {
                return { errors: error };
            }
        });
    }
    // ============================Delete User=====================
    deleteuser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield adduser_1.default.findByIdAndDelete({ _id: id.id });
                const data3 = "Successfull";
                if (!data) {
                    throw new appError_1.default("Wrong Id", 400);
                }
                else {
                    return (0, response_1.default)(204, "User Deleted Successfully", data3);
                }
            }
            catch (error) {
                return { errors: error };
            }
        });
    }
    // ============================update user=========================
    updateuser(id, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = { new: true };
            console.log(request.mydata, "mydata");
            const updates = request.mydata;
            const result = yield adduser_1.default.findByIdAndUpdate(id.id, updates, options);
            try {
                if (request.mydata.Password) {
                    const salt = yield bcrypt_1.default.genSalt(10);
                    const hashedPwd = yield bcrypt_1.default.hash(request.mydata.Password, salt);
                    yield adduser_1.default.updateOne({ _id: id.id }, { $set: { Password: hashedPwd } });
                }
                ;
                if (!result) {
                    throw new appError_1.default("Wrong id", 400);
                }
                return (0, response_1.default)(204, "User Updated Successfully", "success");
            }
            catch (error) {
                return { errors: error };
            }
        });
    }
    // ======================Get class names=====================
    getclass() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fetchclass = yield courseSchema_1.default.find().select("Class");
                console.log("controller side");
                return (0, response_1.default)(200, "Classes", fetchclass);
                //   {
                //   statusCode:200,
                //   message: "Classes",
                //   data: fetchclass
                //  }
                // let fetchclass = await courseSchema.find().select("Class");
                // res.json(getStandardResponse(200,"Classes",fetchclass))
            }
            catch (error) {
                // this.next(error)
                return error;
            }
        });
    }
};
__decorate([
    (0, tsoa_1.Post)("/admin/user/create"),
    (0, tsoa_1.Example)({
        userRoll: 3,
        Password: "password123",
        Phone: 9066665270,
        Email: "joesung@rediffmail.com",
        LastName: "sung",
        FirstName: "joe"
    }),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Admin.prototype, "adduser", null);
__decorate([
    (0, tsoa_1.Post)("admin/user/login"),
    (0, tsoa_1.Example)({
        Lemail: "user6@gmail.com",
        Lpassword: "user123",
    }),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Admin.prototype, "login", null);
__decorate([
    (0, tsoa_1.Post)("/admin/user/verifyotp"),
    (0, tsoa_1.Example)({
        email: "user8@gmail.com",
        otp: "2597",
    }),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Admin.prototype, "matchmyotp", null);
__decorate([
    (0, tsoa_1.Security)("Bearer"),
    (0, tsoa_1.Get)("/admin/user/allusers/protected"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Admin.prototype, "protected", null);
__decorate([
    (0, tsoa_1.Security)("Bearer"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Admin.prototype, "mailer", null);
__decorate([
    (0, tsoa_1.Security)("Bearer"),
    (0, tsoa_1.Post)("/admin/user/forgotpassword/matchotp"),
    (0, tsoa_1.Example)({
        newotp: 2597,
        newpassword: "user234"
    }),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Admin.prototype, "chngpwd", null);
__decorate([
    (0, tsoa_1.Security)("Bearer"),
    (0, tsoa_1.Delete)("/admin/user/delete"),
    (0, tsoa_1.Example)({
        id: "62a9d03be95d92b405381c70"
    }),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Admin.prototype, "deleteuser", null);
__decorate([
    (0, tsoa_1.Security)("Bearer"),
    (0, tsoa_1.Patch)("/admin/user/update"),
    (0, tsoa_1.Example)({
        id: "62a9d03be95d92b405381c70",
        FirstName: "Rajat"
    }),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Admin.prototype, "updateuser", null);
__decorate([
    (0, tsoa_1.Security)("Bearer"),
    (0, tsoa_1.Get)("/admin/classes"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Admin.prototype, "getclass", null);
Admin = __decorate([
    (0, tsoa_1.Tags)("USER API's"),
    (0, tsoa_1.Route)()
], Admin);
exports.Admin = Admin;
// export default Admin;
//  let  Adminobj= new Admin()
//  export default Adminobj
//   ==============================================================
