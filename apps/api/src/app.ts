import express from "express";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";

const app = express();


import cors from "cors";

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use("/api/v1/user" , userRouter);
app.use("/api/v1/auth" , authRouter);


export default app;