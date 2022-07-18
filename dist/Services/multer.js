"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const multer=require("multer")
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const pic = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname == "img") {
            cb(null, "./views/uploads");
        }
        else {
            cb(null, "./views/profile");
        }
    },
    // "./views/uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const FileUpload = (0, multer_1.default)({ storage: pic });
// module.exports = {
//   FileUpload:FileUpload
// }
exports.default = FileUpload;
// export = FileUpload
