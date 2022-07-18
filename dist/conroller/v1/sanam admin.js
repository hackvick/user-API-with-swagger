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
const appError_1 = __importDefault(require("../../utils/appError"));
const response_1 = __importDefault(require("../../Helper/response"));
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
// import { jwt } from "../../Authentication";
// import multer from "multer"
const adduser_1 = __importDefault(require("../../models/adduser"));
const courseSchema_1 = __importDefault(require("../../models/courseSchema"));
const transhist_1 = __importDefault(require("../../models/transhist"));
const assignclass_1 = __importDefault(require("../../models/assignclass"));
// import IResponse from "../../utils/iResponse"
const app = (0, express_1.default)();
class ExpressClass {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
}
class Admin {
    // req: Request;
    // res: Response;
    // next:NextFunction;
    // constructor(req: Request, res: Response,next:NextFunction){
    //   this.req = req;
    //     this.res = res;
    //     this.next = next;
    // super(req,res,next);
    // };
    // async sendResponse(data:any,message:string,statusCode:number,){
    //   this.res.json(getStandardResponse(statusCode,message,data));}
    adduser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var currentime = new Date();
                var year = currentime.getFullYear();
                const ll = year.toString(10).slice(-2);
                const usedata = yield adduser_1.default.find({ userRoll: 3 }).count();
                const num = String(usedata).padStart(2, "0");
                const username = "PR" + ll + num;
                const data = req.body;
                data.username = username;
                let data1 = yield adduser_1.default.findOne({ Email: req.body.Email });
                if (data1) {
                    throw new appError_1.default("User already exist", 409);
                }
                else {
                    yield new adduser_1.default(data).save();
                    delete data.Password;
                    // this.sendResponse(data,"user registered successfully",906);
                    res.json((0, response_1.default)(data, "user registered successfully", 201));
                    //   this.res.json(getStandardResponse(201,"user registered successfully",data))
                }
            }
            catch (error) {
                next(error);
                //   this.error(error)
            }
        });
    }
    generatetransid() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = crypto_1.default.randomBytes(16).toString("hex");
            return id;
        });
    }
    // ====================Login=================
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Lemail = req.body.Lemail;
                const Lpassword = req.body.Lpassword;
                const loginuser = yield adduser_1.default.findOne({ Email: Lemail });
                if (!loginuser) {
                    throw new appError_1.default("User doesn't exist", 404);
                }
                else {
                    const myid = loginuser._id;
                    if (yield bcrypt_1.default.compare(Lpassword, loginuser.Password)) {
                        //  const RefreshToken = await jwt.jwt.generateRefreshToken(myid);
                        // const AccessToken= await jwt.jwt.generateToken(myid);
                        // console.log("Refresh token"+"  "+RefreshToken+"     "+"Access Token"+"  "+AccessToken);
                        // if (loginuser.Email == Lemail && loginuser.Password == Lpassword) {
                        if (loginuser.userRoll === 1) {
                            res.json((0, response_1.default)(200, `welcome to admin Panel ${loginuser.FirstName}`));
                        }
                        else if (loginuser.userRoll == 2) {
                            res.json((0, response_1.default)(200, `welcome to staff Panel ${loginuser.FirstName}`));
                        }
                        else {
                            res.json((0, response_1.default)(200, `welcome to student Panel ${loginuser.FirstName}`));
                        }
                    }
                    else {
                        throw new appError_1.default("user not matched", 404);
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // ============================Delete User=====================
    deleteuser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.query.id;
                const data = yield adduser_1.default.findByIdAndDelete({ _id: id });
                if (!data) {
                    throw new appError_1.default("Wrong Id", 400);
                }
                else {
                    res.json((0, response_1.default)(204, "User Deleted Successfully"));
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // ============================Delete Class======================
    deleteClass(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.query.id;
                const data = yield courseSchema_1.default.deleteOne({ _id: id });
                if (!data) {
                    throw new appError_1.default("Wrong Id", 400);
                }
                res.json((0, response_1.default)(204, "Class Deleted Successfully"));
            }
            catch (error) {
                next(error);
            }
        });
    }
    // ============================Delete student======================
    deletestudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.query.id;
                const data = yield assignclass_1.default.deleteOne({ _id: id });
                if (!data) {
                    throw new appError_1.default("Worng id", 400);
                }
                res.json((0, response_1.default)(204, "Student Deleted Successfully"));
            }
            catch (error) {
                next(error);
            }
        });
    }
    // ============================update user=========================
    updateuser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.query.id;
            const options = { new: true };
            const updates = req.body;
            const oldata = yield adduser_1.default.findOne({ _id: id });
            const result = yield adduser_1.default.findByIdAndUpdate(id, updates, options);
            try {
                if (!result) {
                    throw new appError_1.default("Wrong id", 400);
                }
                res.json((0, response_1.default)(204, "User Updated Successfully", result));
            }
            catch (error) {
                next(error);
            }
        });
    }
    // ============================update class========================
    updateClass(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.id;
                const updates = req.body;
                const options = { new: true };
                const result = yield courseSchema_1.default.findByIdAndUpdate(id, updates, options);
                if (!result) {
                    throw new appError_1.default("Wrong id", 400);
                }
                res.json((0, response_1.default)(204, "Class Updated Successfully", result));
            }
            catch (error) {
                next(error);
            }
        });
    }
    // ============================update student=============
    updatestudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.query.id;
                const options = { new: true };
                const updates = req.body;
                const result = yield assignclass_1.default.findByIdAndUpdate(id, updates, options);
                if (!result) {
                    throw new appError_1.default("Wrong id", 400);
                }
                res.json((0, response_1.default)(204, "Student Updated Successfully", result));
            }
            catch (error) {
                next(error);
            }
        });
    }
    //===========================================================Get===================
    //   ADD COURSES
    addCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                let reqclass = req.body.Class;
                let reqccode = req.body.class_code;
                const claas = yield courseSchema_1.default.find({ Class: reqclass });
                const code = yield courseSchema_1.default.find({ class_code: reqccode });
                if (claas.length == 0 && code.length == 0) {
                    yield new courseSchema_1.default(data).save();
                    res.json((0, response_1.default)(201, "Course added Successfully", data));
                }
                else {
                    if (Number(claas) != 0) {
                        throw new appError_1.default("Class is registered", 409);
                    }
                    else {
                        throw new appError_1.default("Class_code is registered", 409);
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // =====================================================  Get Api's==================================
    getstudentbyclassid(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.id;
                if (!id) {
                    throw new appError_1.default("Please enter student id", 403);
                }
                else {
                    if (id.length != 24) {
                        throw new appError_1.default("Wrong student id", 400);
                    }
                    else {
                        const data1 = yield assignclass_1.default.find({ classId: id });
                        if (data1.length == 0) {
                            throw new appError_1.default("no data found", 404);
                        }
                        else {
                            res.json((0, response_1.default)(204, "Student Data", data1));
                        }
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // ============================================Transaction======================================================
    transHist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stuId = req.query.stuId;
                const classId = req.query.classId;
                if (!stuId) {
                    throw new appError_1.default("Pease enter valid student id", 400);
                }
                else {
                    if (!classId) {
                        throw new appError_1.default("Please enter valid class id", 400);
                    }
                    else {
                        const studentdata = yield assignclass_1.default.findOne({
                            _id: stuId,
                        });
                        if (!studentdata) {
                            throw new appError_1.default("Data not found", 403);
                        }
                        else {
                            const obj = {
                                stuId: req.query.stuId,
                                classId: req.query.classId,
                                Firstname: studentdata.Firstname,
                                class_code: studentdata.class_code,
                                Fee_type: req.body.Fee_type,
                                Amount: req.body.Amount,
                                transactionId: yield this.generatetransid(),
                            };
                            const classdata = yield courseSchema_1.default.findOne({
                                _id: classId,
                            });
                            let myfee = classdata.Admission_Fee;
                            let dota = studentdata.Firstname;
                            yield new transhist_1.default(obj).save();
                            if (obj.Fee_type == 1) {
                                const rest = classdata.Admission_Fee - obj.Amount;
                                const myobj = yield assignclass_1.default.findByIdAndUpdate(stuId, {
                                    total_Due: rest,
                                });
                                res.json((0, response_1.default)(200, "Admission Fee Paid Successfully"));
                            }
                            else if (obj.Fee_type == 2) {
                                const rest = classdata.Monthly_Fee - obj.Amount;
                                const sum = studentdata.total_Due + rest;
                                const myobj = yield assignclass_1.default.findByIdAndUpdate(stuId, {
                                    total_Due: sum,
                                });
                                res.json((0, response_1.default)(200, "Monthly Fee Paid Successfully"));
                            }
                            else if (obj.Fee_type == 3 || 4) {
                                const rest = obj.Amount;
                                const sum = studentdata.total_Due - obj.Amount;
                                yield assignclass_1.default.findByIdAndUpdate(stuId, {
                                    total_Due: sum,
                                });
                                if (obj.Fee_type == 3) {
                                    res.json((0, response_1.default)(200, "Fine Paid Successfully"));
                                }
                                else {
                                    res.json((0, response_1.default)(200, "Dues Paid Successfully"));
                                }
                            }
                            let mydue = yield assignclass_1.default.findById(stuId);
                            if (mydue.total_Due <= 0) {
                                yield assignclass_1.default.findByIdAndUpdate(stuId, {
                                    pendingFee: true,
                                });
                            }
                            else {
                                yield assignclass_1.default.findByIdAndUpdate(stuId, {
                                    pendingFee: false,
                                });
                            }
                        }
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // ===============getTransaction============
    gettransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { page, size } = req.query;
                if (!page) {
                    page = 1;
                }
                if (!size) {
                    size = 5;
                }
                const limit = parseInt(size);
                const skip = (page - 1) * size;
                const trdata = yield transhist_1.default
                    .find({}, { Fee_type: 1, Amount: 1, transactionId: 1, createdAt: 1 })
                    .limit(limit)
                    .skip(skip)
                    .sort({ updatedAt: -1 });
                res.json((0, response_1.default)(200, "Transactions", trdata));
            }
            catch (error) {
                next(error);
            }
        });
    }
    //=============== Get student names================
    getstudents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { page, size } = req.query;
                if (!page) {
                    page = 1;
                }
                if (!size) {
                    size = 2;
                }
                const limit = parseInt(size);
                const skip = (page - 1) * size;
                let fetchdata = yield adduser_1.default
                    .find({ userRoll: 3 })
                    .limit(limit)
                    .skip(skip)
                    .sort({ updatedAt: -1 });
                res.json((0, response_1.default)(200, "Student Data", fetchdata));
            }
            catch (error) {
                next(error);
            }
        });
    }
    // ======================Get class names=====================
    getclass(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fetchclass = yield courseSchema_1.default.find().select("Class");
                res.json((0, response_1.default)(200, "Classes", fetchclass));
            }
            catch (error) {
                next(error);
            }
        });
    }
    // ==================Uer data by student Id===================
    userdatabystudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stuId = req.query.stuId;
                if (!stuId) {
                    throw new appError_1.default("Please enter student id", 403);
                }
                else {
                    if (stuId.length != 24) {
                        throw new appError_1.default("Wrong student id", 400);
                    }
                    else {
                        let limited_data = yield assignclass_1.default.findOne({ _id: stuId });
                        if (!limited_data) {
                            throw new appError_1.default("Data not Found", 403);
                        }
                        else {
                            let userId = limited_data.userId;
                            const udata = yield adduser_1.default.findOne({ _id: userId });
                            if (!udata) {
                                throw new appError_1.default("No record found", 404);
                            }
                            else {
                                res.json((0, response_1.default)(200, "User_Data", udata));
                            }
                        }
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // =========================filter by date=========================
    filterbydate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var startDate = req.query.startDate;
                var endDate = req.query.endDate;
                if (!startDate) {
                    throw new appError_1.default("Please enter start date", 400);
                }
                else {
                    if (!endDate) {
                        throw new appError_1.default("Please enter end date", 400);
                    }
                    else {
                        const newendDate = new Date(endDate);
                        newendDate.setDate(newendDate.getDate() + 1);
                        if (!newendDate) {
                            throw new appError_1.default("Please enter a valid date", 400);
                        }
                        else {
                            const result = yield transhist_1.default
                                .find({ createdAt: { $gte: startDate, $lte: newendDate } })
                                .sort({ updatedAt: -1 });
                            if (result.length == 0) {
                                throw new appError_1.default("No result found", 404);
                            }
                            else {
                                res.json((0, response_1.default)(200, "Filtered Data by Date", result));
                            }
                        }
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // =================filter by class=====================
    filterbyclass(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classes = req.query.classes;
                if (!classes) {
                    throw new appError_1.default("Please enter class", 400);
                }
                else {
                    let noclass = Math.floor(classes);
                    const result = yield courseSchema_1.default.findOne({
                        Class: noclass,
                    });
                    if (!result) {
                        throw new appError_1.default("No class found", 403);
                    }
                    else {
                        let id = result._id;
                        const filteredtrans = yield transhist_1.default.find({
                            classId: id,
                        });
                        if (filteredtrans.length == 0) {
                            throw new appError_1.default(`No student found of class ${result.Class}`, 403);
                        }
                        else {
                            res.json((0, response_1.default)(200, "Filter data by class", filteredtrans));
                        }
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // =====================filter by name====================
    filterbyname(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const firstname = req.query.firstname;
                if (!firstname) {
                    throw new appError_1.default("Please enter a name", 400);
                }
                else {
                    const databyname = yield transhist_1.default.find({
                        Firstname: firstname,
                    });
                    if (databyname.length == 0) {
                        throw new appError_1.default("No records found", 403);
                    }
                    else {
                        res.json((0, response_1.default)(200, "Filter Data by Name", databyname));
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    //================== giving class to user========================
    giveclass(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = req.query.userId;
                let classId = req.query.classId;
                if (classId.length != 24 || userId.length != 24) {
                    throw new appError_1.default("Incorrect userid or classIdd", 400);
                }
                else {
                    if (!userId) {
                        throw new appError_1.default("Please Enter user id", 400);
                    }
                    else {
                        if (!classId) {
                            throw new appError_1.default("Please enter class id", 400);
                        }
                        else {
                            const userdata = yield adduser_1.default.findById({ _id: userId });
                            if (!userdata) {
                                throw new appError_1.default("incorrect userId", 400);
                            }
                            else {
                                const classdata = yield courseSchema_1.default.findById({
                                    _id: classId,
                                });
                                if (!classdata) {
                                    throw new appError_1.default("incorrect classid or userid", 400);
                                }
                                else {
                                    const studata = yield assignclass_1.default.find({
                                        userId: userId,
                                        classId: classId,
                                    });
                                    if (studata.length == 0) {
                                        const myclass = classdata.Class;
                                        const newobj = yield assignclass_1.default
                                            .find({ Class: myclass })
                                            .count();
                                        const data = {
                                            Firstname: userdata.FirstName,
                                            userId: userdata._id,
                                            classId: classdata._id,
                                            Class: classdata.Class,
                                            class_code: classdata.class_code,
                                            monthlyfee: classdata.Monthly_Fee,
                                            Admission_Fee: classdata.Admission_Fee,
                                            total_Due: req.body.total_Due,
                                            rollNum: myclass * 1000 + 1 + newobj,
                                        };
                                        const mydue = yield new assignclass_1.default(data).save();
                                        res.json((0, response_1.default)(200, "Student Added", data));
                                    }
                                    else {
                                        throw new appError_1.default("This class is already assigned to this user ", 409);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // ========================Payment Record===============
    paymentrecord(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let reqclass = req.query.class;
                var objectId = new mongoose_1.default.Types.ObjectId(reqclass);
                let datear = [];
                let arr = [];
                const date2 = new Date();
                date2.setHours(0, 0, 0); //Today
                let datearray = [7, 30, 1000]; //week,month,total
                datear.push(date2);
                for (let j = 0; j < 4; j++) {
                    var date = new Date();
                    date.setDate(date.getDate() - datearray[j]);
                    datear.push(date);
                }
                let showdata;
                for (let i = 0; i < 4; i++) {
                    if (!req.query.class) {
                        showdata = { createdAt: { $gte: datear[i] } };
                    }
                    else {
                        showdata = { "$and": [{ classId: objectId }, { createdAt: { $gte: datear[i] } }] };
                    }
                    const today_sum = yield transhist_1.default.aggregate([
                        { $match: showdata },
                        {
                            $group: {
                                _id: null,
                                total: {
                                    $sum: "$Amount",
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                total: 1,
                            },
                        },
                    ]);
                    arr.push(today_sum);
                }
                for (let i = 0; i < 4; i++) {
                    if (arr[i].length == 0) {
                        arr[i] = [{ total: 0 }];
                    }
                }
                const newobj = {
                    today: arr[0][0].total,
                    week: arr[1][0].total,
                    month: arr[2][0].total,
                    total: arr[3][0].total
                };
                res.json((0, response_1.default)(200, "Success", newobj));
            }
            catch (error) {
                next(error);
            }
        });
    }
}
// export default Admin;
let Adminobj = new Admin();
exports.default = Adminobj;
// async function  adduser(req:Request, res:Response,next:NextFunction) {
//     try {
//       var currentime = new Date();
//       var year = currentime.getFullYear();
//       const ll = year.toString(10).slice(-2);
//       const usedata = await myUserdata.find({ userRoll: 3 }).count();
//       const num:String = String(usedata).padStart(2, "0");
//       const username = "PR" + ll + num;
//       const data = req.body;
//       data.username = username;
//       let data1 = await myUserdata.findOne({ Email: req.body.Email });
//       if (data1) {
//         throw new appError ("User already exist",409)
//       } else {
//         await new myUserdata(data).save();
//         delete data.Password
//       res.json(getStandardResponse(201,"user registered successfully",data))
//       }
//     } catch (error) {
//       next(error)
//     }
//   }
//   module.exports = Admin;
// module.exports = {
//   adduser: adduser,
//   login: login,
//   addCourse: addCourse,
//   giveclass: giveclass,
//   getstudents: getstudents,
//   getclass: getclass,
//   transHist: transHist,
//   getstudentbyclassid: getstudentbyclassid,
//   userdatabystudent: userdatabystudent,
//   deleteClass: deleteClass,
//   deleteuser: deleteuser,
//   deletestudent: deletestudent,
//   updateClass: updateClass,
//   updatestudent: updatestudent,
//   updateuser: updateuser, 
//   gettransaction: gettransaction,
//   filterbyclass: filterbyclass,
//   paymentrecord: paymentrecord,
//   filterbydate: filterbydate,
//   filterbyname: filterbyname,
//   // test:test
//   // getstudentsbypage:getstudentsbypage
// };
const bv = () => {
    console.log('ghgh');
};
//   ===============================================================================
var easyinvoice = require('easyinvoice');
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        var data = {
            //"documentTitle": "RECEIPT", //Defaults to INVOICE
            "currency": "USD",
            "taxNotation": "vat",
            "marginTop": 25,
            "marginRight": 25,
            "marginLeft": 25,
            "marginBottom": 25,
            "logo": "https://www.easyinvoice.cloud/img/logo.png",
            //"logoExtension": "png", //only when logo is base64
            "sender": {
                "company": "Sample Corp",
                "address": "Sample Street 123",
                "zip": "1234 AB",
                "city": "Sampletown",
                "country": "Samplecountry"
                //"custom1": "custom value 1",
                //"custom2": "custom value 2",
                //"custom3": "custom value 3"
            },
            "client": {
                "company": "Client Corp",
                "address": "Clientstreet 456",
                "zip": "4567 CD",
                "city": "Clientcity",
                "country": "Clientcountry"
                //"custom1": "custom value 1",
                //"custom2": "custom value 2",
                //"custom3": "custom value 3"
            },
            "invoiceNumber": "2020.0001",
            "invoiceDate": "05-01-2020",
            "products": [
                {
                    "quantity": "2",
                    "description": "Test1",
                    "tax": 6,
                    "price": 33.87
                },
                {
                    "quantity": "4",
                    "description": "Test2",
                    "tax": 21,
                    "price": 10.45
                }
            ],
            "bottomNotice": "Kindly pay your invoice within 15 days."
        };
    });
}
