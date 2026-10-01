import { z } from 'zod'
import {signupFormSchema} from "../../../../packages/types/authSchemas"
import { api } from '../api';

export type SignupFormType = z.infer<typeof signupFormSchema>;

export async function signupSubmit( data: SignupFormType ){

    const result = signupFormSchema.safeParse(data);
    if(!result.success){
        return {status: false , message : result.error.issues[0].message} ;
    }

    try{
        const response = await api.post("/auth/signup" , result.data);

        console.log(response);

        localStorage.setItem("token", response.data.token);

        return {
            status : response.status,
            data : response.data,
            message: "Signup Successfull..."
        };
    }
    catch(error: any){
        return {
            status : false,
            message : error.response?.data?.message || "Something went wrong"
        };
    }

}