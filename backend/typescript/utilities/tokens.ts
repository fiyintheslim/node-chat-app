import jwt = require("jsonwebtoken");

export const send = async (id:number)=>{
    const signed = await jwt.sign({id}, process.env.TOKEN_SECRET!, {expiresIn:process.env.TOKEN_EXPIRES});
    return signed;
}

export const verify = async (token:string)=>{
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET!);
    return verified
}