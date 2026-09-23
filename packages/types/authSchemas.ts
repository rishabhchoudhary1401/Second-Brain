import z from "zod";

//this is /signup body schema
export const signupFormSchema = z.object({
    firstName: z.string().min(1 , { "message" : "First name cant be empty"}),
    lastName: z.string().min(1 , { "message" : "Last name cant be empty"}),
    email : z.email().max(100),
    password : z.string().min(8).max(100)
})

// this is /signin body schema

export const loginFormSchema = z.object({
    email: z.email(),
    password: z.string()
});