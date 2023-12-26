import express from "express";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import cors from "cors";
import connectDB from "./src/mongodb/connect.js";
import dotenv from "dotenv";
import loginRoute from "./src/routes/loginRoute.js";
import registerRoute from "./src/routes/registerRoute.js";
import searchUsers from "./src/routes/searchUsers.js";
import chatRoutes from "./src/routes/chatRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(path.join("D:/MERN Project/ChatApp/server/src/index.html"));
});

app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/userSearch", searchUsers);
app.use("/api/chats", chatRoutes);

io.on("connection", (socket) => {
  console.log(`A user connected ${socket.id}`);
});

const port = process.env.PORT || 8000;

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    server.listen(port, () =>
      console.log(`Server is running on http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
