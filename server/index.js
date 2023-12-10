import express from "express";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(path.join("D:/MERN Project/ChatApp/server/src/index.html"));
});

io.on("connection", (socket) => {
  console.log(`A user connected ${socket.id}`);
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
