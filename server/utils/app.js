import express from "express"; // Backend App (server)
import cors from "cors"; // HTTP headers (enable requests)
import helmet from "helmet";
import morgan from "morgan";
import * as dotenv from "dotenv";
import path from "path";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
// check if JWT_SECRET is set in env variables
if (!process.env.JWT_SECRET) {
  const err = new Error(
    "No JWT_SECRET in env variables. Please set JWT_SECRET in .env file."
  );
  logger.warn(err.message);
}
// initialize app
const app = express();

// middlewares
// adjust cors options in production
app.use(cors());
// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// security (adjust helmet options in production)
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// error handling
app.use(notFound);
app.use(errorHandler);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send();
  next();
});

export default app;
