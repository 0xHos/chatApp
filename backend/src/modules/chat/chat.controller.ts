import { Request, Response } from "express";
import ChatServices from "./chat.services";
import { IChat, IMessage } from "../../shared/types";
import ChatModel from "./chat.model";
import MessagesServices from "../messages/messages.services";
import { ChatRepository } from "./chat.repository";
import { AuthService } from "../auth/auth.services";

async function createChat(req: Request, res: Response) {
  try {
    const { userId, userTarget, message } = req.body;

    const user = await AuthService.getUserByUsername(userTarget);
    const chat = await ChatServices.createChat();
    const assignChatToUser = await ChatServices.assignChatToUser(
      userId,
      chat.id!
    );
    const assignChatToTarget = await ChatServices.assignChatToUser(
      user.id?.toString()!,
      chat.id!
    );
    const msg = {
      chatId: chat.id!,
      userId,
      message,
    };
    const assignMessageToChat = await MessagesServices.createMessage(msg);
    res.json({ msg: "chat created successfully", data: assignMessageToChat });
  } catch (err) {
    console.log("CreateChatErr", err);
  }
}

async function getChatsForUserId(req: Request, res: Response) {
  try {
    const { userId } = req.body;
    const chats = await ChatRepository.getChatsForUser(userId);
    res.json({ msg: "done get chats for user", data: chats });
  } catch (err) {
    console.log("error get chats for user", err);
  }
}

async function getChatById(req: Request, res: Response) {
  try {
    const { chat_id } = req.params;
    const messages = await ChatRepository.getMessagesForChat(chat_id);
    res.json({ msg: "done get messages for chat", data: messages });
  } catch (err) {
    console.log("error get chats for user", err);
  }
}

async function assignMessageToChat(req: Request, res: Response) {
  try {
    const { chat_id } = req.params;
    const { message, userId } = req.body;
    const message_info: IMessage = {
      chatId: chat_id,
      message,
      userId,
    };
    const messages = await MessagesServices.createMessage(message_info);
    res.json({ msg: "done get messages for chat", data: messages });
  } catch (err) {
    console.log("error get chats for user", err);
  }
}
export { createChat, getChatsForUserId, getChatById, assignMessageToChat };
