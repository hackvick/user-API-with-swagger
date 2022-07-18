// const mongoose = require("mongoose")
import mongoose from "mongoose";
const url =
// "mongodb+srv://vickyh2:mongo234@cluster0.z2xulvu.mongodb.net/?retryWrites=true&w=majority"  --- new untoch database vicky60

//  "mongodb+srv://vickyhasija1:mongo123@cluster0.xwsm3.mongodb.net/?retryWrites=true&w=majority"
"mongodb+srv://vickyhasija1:mongo123@cluster0.xwsm3.mongodb.net/?retryWrites=true&w=majority"
// "mongodb+srv://vickyhasija1:mongo123@cluster0.xwsm3.mongodb.net/?retryWrites=true&w=majority"



mongoose.connect(url)

// {
//     useUnifiedTopology: true,
//         useNewUrlParser: true,
//         autoIndex: true,}
const connect = mongoose.connection;
// module.exports={connect}
export default connect