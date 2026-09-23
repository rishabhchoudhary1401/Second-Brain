import { Router } from "express";
import {UserDB} from "../db.js";
import { loginFormSchema, signupFormSchema } from "../../../../packages/types/authSchemas.js";
import { compareHashedPass, hashPass } from "../helpers/bcryptHelper.js";
import { signJwt } from "../helpers/jwtHelper.js";
const authRouter = Router();



//type FinalSignupFormSchema = z.infer<typeof signupFormSchema>;
authRouter.post("/signup", async (req, res) =>{
    const parseSignupBody = signupFormSchema.safeParse(req.body);
    if(!parseSignupBody.success) return res.status(400).json({message: "Invalid form data", errors: parseSignupBody.error.issues});
    const signupBody = parseSignupBody.data;
    try{
        const user = await UserDB.findOne({email:signupBody.email});
        if(user) return res.status(409).json({message: "User already exist..."});
        const hashedPassword = await hashPass(signupBody.password);
        signupBody.password = hashedPassword;

        const newUser = await UserDB.create(signupBody);

        const token = signJwt({userId : newUser._id});
        return res.status(201).json({message: "signup succesfull...", token:token});
    } catch(err){
        if(err instanceof Error) return res.status(500).json({message: err.message});
        return res.status(500).json({message: "unknown error"});
    };    
});


authRouter.post("/signin", async (req, res) =>{
    const parsedBody = loginFormSchema.safeParse(req.body);
    if(!parsedBody.success)return res.status(401).json({message: "Login data invalid...", error: parsedBody.error});
    const loginBody = parsedBody.data;

    const user = await UserDB.findOne({email: loginBody.email});
    if(!user) return res.status(404).json({message: "No users Found"});
    if(!user.password) return res.status(500).json({message: "User has not set his password yet..."});
    const passwordMatch = await compareHashedPass(loginBody.password, user.password);
    if(!passwordMatch) return res.status(400).json({message: "Invalid Password..."});

    const token = signJwt({userId: user._id});
    return res.status(200).json({token: token, message: "Login succesfull..."});
});

export default authRouter;