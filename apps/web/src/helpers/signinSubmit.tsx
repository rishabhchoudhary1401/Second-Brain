
import type z from "zod";
import {loginFormSchema} from "../../../../packages/types/authSchemas"
import { api } from '../api';

export type SigninFormType = z.infer<typeof loginFormSchema>;

export async function singinSubmitHelper(data: SigninFormType){
    const result = loginFormSchema.safeParse(data);
    console.log("inside helper");
    if(!result.success){
        console.log("type error");
        return {status: false , message : result.error.issues[0].message} ;
    }

    try{
        const response = await api.post("/auth/signin", result.data);
        console.log(response);
        localStorage.setItem("token", response.data.token);
        return {
            status: true,
            data: response.data,
            message: "Signin Successfull..."
        };
    }catch(e:any){
        return{
            status: false,
            message: e.response?.data?.message || "Something went wrong..."
        }
    }
}