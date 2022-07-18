// module.exports= {
//   multerIndex: require("./multer"),
// //   mailered: require("./nodemailer")
// };
// // const multerIndex = require('./multer')
// // const mailered=require('./nodemailer')
// // module.exports={
// //     multerIndex:multerIndex,
// //     mailered:mailered

// const { pwdgen } = require('./Passwordgenerator');

// // }
import multerIndex from "./multer"
module.exports = {
    emailService : require ('./nodemailer'),
    multerIndex : import('./multer'),
    pwdgen:require("./Passwordgenerator")

}
// module.exports  = multerIndex 
// export default multerIndex