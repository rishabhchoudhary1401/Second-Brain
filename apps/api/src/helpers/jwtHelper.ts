import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { JWT_KEY } from "../config/env.js";

export function signJwt(ObjToBeSigned: object){
    const token = jwt.sign(ObjToBeSigned, JWT_KEY);
    return token;
}
export function verifyJwt(token: string){
    try{
        const decoded = jwt.verify(token, JWT_KEY) as JwtPayload & {
                userId: string;
            };
        return decoded
    }catch(err){
        return null;
    }
}