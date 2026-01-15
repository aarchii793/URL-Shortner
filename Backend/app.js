import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import connectDB from "./src/config/mongoconfig.js";

import authRoutes from "./src/routes/auth.routes.js";
import shortUrlRoutes from "./src/routes/shortUrlroute.js";
import userRoutes from "./src/routes/user.route.js";

import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import { attachUser } from "./src/utils/attachUser.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

/* -------------------- MIDDLEWARE -------------------- */

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(attachUser);

/* -------------------- DATABASE -------------------- */

connectDB();

/* -------------------- API ROUTES -------------------- */

app.use("/api/auth", authRoutes);
app.use("/api/create", shortUrlRoutes);
app.use("/api/user", userRoutes);

/* -------------------- SHORT URL REDIRECT -------------------- */
/* IMPORTANT: must be BEFORE frontend catch-all */

app.get("/:id", redirectFromShortUrl);

/* -------------------- PRODUCTION FRONTEND -------------------- */

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "my-project", "dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "my-project", "dist", "index.html")
    );
  });
}

/* -------------------- ERROR HANDLER -------------------- */

app.use(errorHandler);

/* -------------------- SERVER -------------------- */

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
