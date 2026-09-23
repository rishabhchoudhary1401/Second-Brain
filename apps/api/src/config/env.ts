import "dotenv/config";
if (!process.env.JWT_KEY)
    throw new Error("JWT_KEY missing");

export const JWT_KEY = process.env.JWT_KEY;