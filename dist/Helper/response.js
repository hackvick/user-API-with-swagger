"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import IResponse from "../utils/iResponse"
function getStandardResponse(status, message, data) {
    return {
        status: status,
        message: message,
        data: data
    };
}
// module.exports= getStandardResponse
exports.default = getStandardResponse;
