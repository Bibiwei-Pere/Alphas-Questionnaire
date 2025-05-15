import "dotenv/config";
import "express-async-errors";
import express from "express";
import corsOptions from "./config/corsOptions.js";
import path from "path";
import cors from "cors";
import { logEvents, logger, errorHandler } from "./middleware/logger.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import connectDB from "./config/dbConn.js";
import mongoose from "mongoose";
import rootRoutes from "./routes/root.js";
import questionnaire from "./routes/questionnaire.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3500;
connectDB();

app.use(logger);
app.use(express.json({ limit: "500mb" })); // or an appropriate size
app.use(express.urlencoded({ limit: "500mb", extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", rootRoutes);
app.use("/questionnaire", questionnaire);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) res.sendFile(path.join(__dirname, "views", "404.html"));
  else if (req.accepts("json")) res.json({ message: "404 Not Found" });
  else res.type("txt").send("404 Not Found");
});
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrLog.log");
});
