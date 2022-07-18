//   MUlter
import {Request} from "express"
// const multer=require("multer")
import multer from "multer"
import path from "path"

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void


const pic = multer.diskStorage({
    destination: (req:Request, file:Express.Multer.File, cb:DestinationCallback) => {
      if (file.fieldname == "img") {
        cb(null, "./views/uploads");
      } else {
        cb(null, "./views/profile");
      }
    },
    // "./views/uploads",
    filename: (req:Request, file:Express.Multer.File, cb:FileNameCallback) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const FileUpload = multer({ storage: pic });

  // module.exports = {
  //   FileUpload:FileUpload
  // }
  export default FileUpload
  // export = FileUpload