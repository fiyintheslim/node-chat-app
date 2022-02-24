import jwt = require("jsonwebtoken");

export const send = async (id:number)=>{
    return jwt.sign({id}, process.env.TOKEN_SECRET!, {expiresIn:process.env.TOKEN_EXPIRES})
}

export const verify = async (token:string)=>{
    return jwt.verify(token, process.env.TOKEN_SECRET!)
}