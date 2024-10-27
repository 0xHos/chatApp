import { IChat, IChatUser } from "../../shared/types";
import ChatModel, { UserChatModel } from "./chat.model";

class ChatServices {
  static async createChat() {
    const chat = await ChatModel.create();
    return chat?.toJSON() as IChat;
  }

  static async assignChatToUser(userId: string, chatId: string) {
    const user_chat = await UserChatModel.create({
      UserModelId: userId,
      chatModelId: chatId,
    });
    return user_chat.toJSON() as IChatUser;
  }
  static async getChatById(id: string): Promise<IChatUser[]> {
    const chats = await UserChatModel.findAll({ where: { chatModelId: id } });
    return chats.map((chat) => chat.toJSON());
  }

  static async deleteChat(chatId: string): Promise<number> {
    const chat = await ChatModel.destroy({
      where: { id: chatId },
    });
    return chat;
  }

  static async getChatsByUserId(userId: string): Promise<any[]> {
    const chats = await UserChatModel.findAll({
      where: { UserModelId: userId },
    });
    return chats.map((chat) => chat.toJSON());
  }
}

export default ChatServices;
