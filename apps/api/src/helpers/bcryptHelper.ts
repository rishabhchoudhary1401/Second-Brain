import bcrypt from "bcrypt";
export async function hashPass(pass:string){
    const hashedPassword = await bcrypt.hash(pass, 5);
    return hashedPassword;
}

export async function compareHashedPass(inputPass:string, dbPass:string){
    const passwordMatch = await bcrypt.compare(inputPass, dbPass);
    return passwordMatch;
}