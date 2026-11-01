import app from "./app.js";
import { connectDB } from "./db.js";

async function main(){
    console.log("Connecting to db...");
    await connectDB();
    console.log("Connected to db...");
    const port = Number(process.env.PORT) || 3000;
    app.listen(port, "0.0.0.0", () => {
        console.log(`Listening to port ${port}`);
    });
}
main().catch((error) => {
    console.error("API failed to start", error);
    process.exitCode = 1;
});
