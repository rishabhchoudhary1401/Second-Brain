import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function main(){
    console.log("Connecting to db...");
    if(!process.env.DB_URL){
        console.log("db url not present");
        return;
    }
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to db...");
    app.listen(process.env.PORT);
    console.log(`Listening to port ${process.env.PORT}`);
}
main();