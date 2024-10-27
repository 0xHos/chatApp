import { Router } from "express";
import {
  assignMessageToChat,
  createChat,
  getChatById,
  getChatsForUserId,
} from "./chat.controller";

const chatRouter = Router();

chatRouter.post("/createChat", createChat);
chatRouter.post("/", getChatsForUserId);
chatRouter.get("/:chat_id", getChatById);
chatRouter.post("/:chat_id", assignMessageToChat);

export default chatRouter;
