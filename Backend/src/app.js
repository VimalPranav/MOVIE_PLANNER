import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";   

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", userRouter);


export default app;