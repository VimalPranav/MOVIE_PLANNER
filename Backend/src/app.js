import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";   
import movieRouter from "./routes/movie.route.js";
import uploadRouter from "./routes/upload.route.js";
import tmdbRouter from "./routes/tmdb.route.js";

import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/tmdb", tmdbRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

export default app;