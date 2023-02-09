import * as dotenv from "dotenv";
import app from "./utils/app.js"; // Backend App (server)
import { MongoDB } from "./utils/mongo.js"; // MongoDB (database)
import { PORT } from "./constants/index.js"; // Port

import { MONGO_URI } from "./constants/index.js";
import apiRoutes from "./routes/index.js";

dotenv.config();

async function bootstrap() {
  const mongo_object = new MongoDB({
    dsn: process.env.MONGO_URI,
  });
  await mongo_object.connect();

  app.get("/", (req, res) =>
    res.status(200).json({ message: "API is working!" })
  );

  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(
      `🚀Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`;
  });
}

bootstrap();
