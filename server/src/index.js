import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import path from "path";

const app = express();
const port = process.env.PORT || 9000;
// app.use(cors());
// app.use(express.static(path.resolve("./public")));

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`a user connected on ${socket.id}`);
});

app.get("/", (req, res) => {
  res.send("Hello from Shoaib");
  // return res.sendFile("/server/public/index");
});

const startServer = () => {
  server.listen(port, () =>
    console.log(`Server running on port http://localhost:${port}`)
  );
};

startServer();
