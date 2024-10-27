import { IChatUser } from "../../shared/types";
import { AuthService } from "../auth/auth.services";
import MessageModel from "../messages/messages.model";
import ChatServices from "./chat.services";

export class ChatRepository {
  // this is return   users i chat with it
  static async getChatsForUser(user_id: string) {
    const chatsId: IChatUser[] = await ChatServices.getChatsByUserId(user_id);
    const getChatWith = await Promise.all(
      chatsId.map(async (c) => {
        const chat: IChatUser[] = await ChatServices.getChatById(c.chatModelId);
        const chats = chat.filter((c) => {
          return c.UserModelId != user_id;
        });
        return chats;
      })
    );
    const chats: IChatUser[] = getChatWith.map((c) => {
      return c[0];
    });

    const users_chat_with = await Promise.all(
      chats.map(async (c: IChatUser) => {
        const user = await AuthService.getUserById(c.UserModelId!);
        return {
          conversition: {
            user_id: user.id,
            image: user.image,
            username: user.username,
            l_name: user.l_name,
            f_name: user.f_name,
            chat_id: c.chatModelId,
          },
        };
      })
    );
    return users_chat_with;
  }

  static async getMessagesForChat(chat_id: string) {
    const messages = await MessageModel.findAll({
      where: {
        chatId: chat_id,
      },
      order: [["createdAt", "ASC"]],
    });
    return messages.map((m) => m.toJSON());
  }
}
