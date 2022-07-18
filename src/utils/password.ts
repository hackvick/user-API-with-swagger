import appError from "./appError";

const bcrypt = require('bcrypt')


// export const genHash = (stringValue: string): Promise<string> => {
//     return new Promise((res, rej) => {
    export async function genHash(value:string){
//         try {
//         bcrypt.genSalt(10, function (err: any, salt: string) {
           
                
           
//             if (err) {
//                 console.log("error 1");
                
//                 throw new appError (err.message,404)
//             }
//             bcrypt.hash(value, salt, async (err: any, hash: string) => {
//                 if (err) {
//                     console.log("error 2");
                    
//                     return (err.message)
//                 }
//                 console.log("no_error");
                
//                 return (hash);
//             });
//         ;
//     })
// } catch (error) {
                
// }

// =====
try {
    console.log(value,"password sis");
    
            const salt=  await bcrypt.genSalt(10)
            console.log(salt,"salt");
            
            const hashedPassword= await bcrypt.hash(value,salt)
            console.log(hashedPassword,"hasshed");
            
            // value= hashedPassword
            // console.log(,"hush");
            
            // console.log(this,"this");
            // next()   
            return hashedPassword    
        } catch (error:any) {
            return (error)
            
        }
}