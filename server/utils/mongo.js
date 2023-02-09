import mongoose from "mongoose";

import { MONGO_OPTIONS } from "../constants/index.js";

class MongoDB {
  constructor(options) {
    this.mongoose = mongoose;
    this.isConnected = false;
    this.options = options;
    this.connect();
  }

  async connect() {
    if (this.isConnected) return;

    try {
      const db = await this.mongoose.connect(this.options.dsn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const connection = db.connection;

      this.isConnected = connection.readyState === 1;

      if (this.isConnected) console.log("✅ MongoDB connected");

      connection.on("connected", () => console.log("✅ MongoDB connected")); // re-connected
      connection.on("disconnected", () =>
        console.log("❌ MongoDB disconnected")
      ); // disconnected
      connection.on("error", (error) =>
        console.log("❌ MongoDB connection error", error)
      ); // listen for errors during the session
    } catch (error) {
      console.log("❌ MongoDB connection error:", error.message);
    }
  }
}

export { MongoDB };
