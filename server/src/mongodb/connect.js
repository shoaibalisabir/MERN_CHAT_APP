import mongoose from "mongoose";

const connectDB = (url, app) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => console.log(err));
};

export default connectDB;
