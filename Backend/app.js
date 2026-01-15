
 

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/mongoconfig.js";
import authRoutes from "./src/routes/auth.routes.js";
import shortUrlRoutes from "./src/routes/shortUrlroute.js";
import userRoutes from "./src/routes/user.route.js";
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import { attachUser } from "./src/utils/attachUser.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(attachUser);

app.use("/api/auth", authRoutes);
app.use("/api/create", shortUrlRoutes);
app.use("/api/user", userRoutes);

app.get("/:id", redirectFromShortUrl);
app.use(errorHandler);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on http://localhost:3000");
});

export default app;

