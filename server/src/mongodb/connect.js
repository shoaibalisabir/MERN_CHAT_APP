import mongoose from "mongoose";
import loginRoute from "../routes/loginRoute.js";
import registerRoute from "../routes/registerRoute.js";

const connectDB = (url, app) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB Connected");
      app.use("/api/login", loginRoute);
      app.use("/api/register", registerRoute);
    })
    .catch((err) => console.log(err));
};

export default connectDB;
