import express from "express";
import "dotenv/config";
import { createTables } from "./src/config/db/tables";
import bodyParser from "body-parser";
import authRouter from "./src/modules/auth/auth.route";
import chatRouter from "./src/modules/chat/chat.router";
import messagesRouter from "./src/modules/messages/messages.router";
import checkToken from "./src/middleware/checkToken";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth/", authRouter);

app.use(checkToken);
app.use("/api/chat/", chatRouter);
app.use("/api/message/", messagesRouter);

const PORT = process.env.SERVER_PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  createTables();
});

io.on("connection", (socket) => {
  socket.on("joinToChat", (data) => {
    console.log("data", data);
    socket.join(data.chatId);
    socket.on("hi", (data) => {
      console.log("data", data);
    });
    socket.on("new_message", (data) => {
      console.log("data", data);
      io.to(data.chatId).emit("receive_message", data);
    });
  });
});
