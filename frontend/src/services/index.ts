import axios from "axios";
import { IUser } from "../types";
import { endpoints } from "../constants/endpoints";

export class Api {
  static async signup(user: IUser) {
    try {
      const response = axios.post(endpoints.auh.signup, {
        ...user,
      });
      const data = await (await response).data.message;
      return { error: false, message: data };
    } catch (err) {
      return {
        error: true,
        message: err.response.data.message,
      };
    }
  }

  static async login(user: IUser) {
    try {
      const response = axios.post(endpoints.auh.login, {
        ...user,
      });
      const data = await (await response).data;
      return {
        error: false,
        message: data.message,
        token: data.data.token,
        userId: data.data.userId,
      };
    } catch (err) {
      return {
        error: true,
        message: err.response.data.message,
      };
    }
  }

  static async getChats(token: string) {
    try {
      const response = await axios.post(
        endpoints.chat.chats,
        {},
        { headers: { auth: token } },
      );
      const data = await response.data;
      console.log("chats for userID", data);
      return data;
    } catch (err) {
      console.log("err in getChats", err);
    }
  }

  static async createChat(token: string, userTarget: string, message: string) {
    try {
      const response = await axios.post(
        endpoints.chat.createChat,
        {
          userTarget,
          message,
        },
        { headers: { auth: token } },
      );
      const data = await response.data;
      console.log("chats for userID", data);
      return data;
    } catch (err) {
      console.log("err in getChats", err);
    }
  }

  static async createMessage(token: string, chatId: string, message: string) {
    try {
      const response = await axios.post(
        `${endpoints.chat.chats}/${chatId}`,
        {
          chatId,
          message,
        },
        { headers: { auth: token } },
      );
      const data = await response.data;
      console.log("createMessage", data);
      return data;
    } catch (err) {
      console.log("err in createMessage", err);
    }
  }

  static async getMessagesForChat(token: string, chatId: string) {
    try {
      const response = await axios.get(
        `${endpoints.chat.chats}/${chatId}`,

        { headers: { auth: token } },
      );
      const data = await response.data;
      console.log("createMessage", data);
      return data;
    } catch (err) {
      console.log("err in createMessage", err);
    }
  }
}
