import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";
import ChatRoute from "./Routes/ChatRoute.js";
import MessageRoute from "./Routes/MessageRoute.js";

//Routes
const app = express();

//to serve images for public
app.use(express.static("public"));
app.use("/images", express.static("images"));

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

mongoose.connect(process.env.MONGODB_URL);
const con = mongoose.connection;

con.on("open", () => {
  console.log("Connected to MongoDB");
});

con.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err.message);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening at ${process.env.PORT}`);
});

//usage of routes
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/upload", UploadRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
