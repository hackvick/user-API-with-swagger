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
const adduser_1 = __importDefault(require("../../models/adduser"));
const appError_1 = __importDefault(require("../../utils/appError"));
const response_1 = __importDefault(require("../../Helper/response"));
const app = (0, express_1.default)();
class ExpressClass {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
    sendResponse(data) {
        this.res.send(data);
    }
}
class llop extends ExpressClass {
    static log(arg) {
        return console.log(arg);
    }
}
class Admin extends llop {
    adduser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var currentime = new Date();
                var year = currentime.getFullYear();
                const ll = year.toString(10).slice(-2);
                const usedata = yield adduser_1.default.myUserdata.find({ userRoll: 3 }).count();
                const num = String(usedata).padStart(2, "0");
                const username = "PR" + ll + num;
                const data = yield this.req.body;
                data.username = username;
                let data1 = yield adduser_1.default.myUserdata.findOne({ Email: this.req.body.Email });
                if (data1) {
                    throw new appError_1.default("User already exist", 409);
                }
                else {
                    yield adduser_1.default.myUserdata(data).save();
                    delete data.Password;
                    this.sendResponse(data);
                    this.res.json((0, response_1.default)(201, "user registered successfully", data));
                }
            }
            catch (error) {
                this.next(error);
            }
        });
    }
}
Admin.log('hivnmcvbnm');
