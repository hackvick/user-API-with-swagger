


// import config from "./config/config"
import connection from "./connection/connection"
import express,{Application} from "express"   
import cors from "cors"
import bodyParser from "body-parser"
import route from "./routers/routes"
import path from "path"
import server from "http"
const app:Application = express();
server.createServer(app)
import multer from "multer"
import errorhandle from "./middleware/errorhandler"
import port from "./config/config"
import { Tsoa } from "tsoa"
import "./conroller/v1/admincontroller"
import * as swaggerUi from "swagger-ui-express"

// import {RegisterRoutes} from './swag/routes'





app.use(express.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json() )
app.use(cors())
connection.on('open',(err:unknown)=>{
    console.log('database connected successfully');
   })

   app.listen(port,()=>{
    // if(err) throw (err)
    console.log(`connection is running on ${port}`);
})

// RegisterRoutes(app)
try{
    const swaggerDocument = require("./swag/swagger.json")
    app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
}catch(err){
    console.error("Unable to read swagger.json",err);
}
// const swaggerDoc = require('../')


app.use('/api/v1',route)
app.all("*",errorhandle.errorcreate)
app.use(errorhandle.routeError)

