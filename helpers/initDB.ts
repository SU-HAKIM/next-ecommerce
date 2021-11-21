import mongoose from "mongoose";

function initDB() {
  if (mongoose.connections[0].readyState) {
    console.log("already connected");
    return;
  }
  mongoose.connect(process.env.MONGO_URL as string);
  mongoose.connection.on("connected", () => {
    console.log("database connected");
  });
  mongoose.connection.on("error", () => {
    console.log("error ocurred");
  });
}

export default initDB;
