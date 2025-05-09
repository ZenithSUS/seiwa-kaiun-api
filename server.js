import express from "express";
import cors from "cors";
import path from "path";
import users from "./routes/users.js";
import requirments from "./routes/requirements.js";
import activities from "./routes/activity-logs.js";
import { fileURLToPath } from "url";
import { logger } from "./middleware/logger.js";
import { notFound } from "./middleware/not-found.js";
import { error } from "./middleware/error.js";
import "./cronJobs.js";
import dotenv from "dotenv";

dotenv.config();

// Port number
const port = process.env.NODE_ENV === "development" ? 8080 : false || 8000;

// Base directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize app
const app = express();

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// Route to handle favicon.ico requests
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Routes
app.use("/api/users", users);
app.use("/api/requirements", requirments);
app.use("/api/activity-logs", activities);

// Error Handlers
app.use(notFound);
app.use(error);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
