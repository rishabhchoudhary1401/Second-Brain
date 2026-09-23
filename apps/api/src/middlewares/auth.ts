import type { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../helpers/jwtHelper.js";

export const  auth = (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers.token;
    if(!token || Array.isArray(token)) return res.status(401).json({message: "Please login again..."});
    const decoded = verifyJwt(token);
    if(decoded){
        req.userId = decoded.userId;
        next();
    }
    else return res.status(401).json({message: "Unauthorised..."});
    
}

