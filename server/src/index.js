import express from "express";
import { Server } from "socket.io";
import createServer from "node:http";
import cors from "cors";
import path from "path";

const app = express();
const port = process.env.PORT || 9000;
app.use(cors());
app.use(express.static(path.resolve("./public")));

const server = createServer.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  // res.send("Hello from Shoaib");
  res.sendFile("/server/public/index");
});

const startServer = () => {
  server.listen(port, () =>
    console.log(`Server running on port http://localhost:${port}`)
  );
};

startServer();
