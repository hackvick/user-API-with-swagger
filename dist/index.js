"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import config from "./config/config"
const connection_1 = __importDefault(require("./connection/connection"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routers/routes"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
http_1.default.createServer(app);
const errorhandler_1 = __importDefault(require("./middleware/errorhandler"));
const config_1 = __importDefault(require("./config/config"));
require("./conroller/v1/admincontroller");
const swaggerUi = __importStar(require("swagger-ui-express"));
// import {RegisterRoutes} from './swag/routes'
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
connection_1.default.on('open', (err) => {
    console.log('database connected successfully');
});
app.listen(config_1.default, () => {
    // if(err) throw (err)
    console.log(`connection is running on ${config_1.default}`);
});
// RegisterRoutes(app)
try {
    const swaggerDocument = require("../swagger.json");
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
catch (err) {
    console.error("Unable to read swagger.json", err);
}
// const swaggerDoc = require('../')
app.use('/api/v1', routes_1.default);
app.all("*", errorhandler_1.default.errorcreate);
app.use(errorhandler_1.default.routeError);
