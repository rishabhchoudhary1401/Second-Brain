import express, { type Express } from "express";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import { connectDB } from "./db.js";
import { WEB_ORIGIN } from "./config/env.js";

const app: Express = express();

app.use(cors({
    origin: WEB_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(async (_req, _res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        next(error);
    }
});
app.use("/api/v1/user" , userRouter);
app.use("/api/v1/auth" , authRouter);


export default app;
