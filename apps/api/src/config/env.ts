import "dotenv/config";
if (!process.env.JWT_KEY)
    throw new Error("JWT_KEY missing");

export const JWT_KEY = process.env.JWT_KEY;

export const WEB_ORIGIN = process.env.WEB_ORIGIN || (process.env.NODE_ENV === "production" ? "" : "http://localhost:5173");
if (!WEB_ORIGIN)
    throw new Error("WEB_ORIGIN missing");
