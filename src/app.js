import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import dotenv from "dotenv";

import indexRoutes from "./routes/index.routes.js";
import moviesRoutes from "./routes/movies.routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// logs
app.use(morgan("dev"));

// body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static
app.use("/public", express.static(path.join(__dirname, "public")));

// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// routes
app.use("/", indexRoutes);
app.use("/movies", moviesRoutes);

// 404
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

export default app;
