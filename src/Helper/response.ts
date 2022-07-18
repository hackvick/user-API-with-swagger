// import IResponse from "../utils/iResponse"
function getStandardResponse(status: number, message: string, data?: any)
{
    
    return {
        status: status,
        message : message,
        data : data
     }
}
// module.exports= getStandardResponse
export default getStandardResponse