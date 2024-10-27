import { Request } from "express";

export interface IUser {
  id?: string;
  image: string;
  username: string;
  password: string;
  f_name: string;
  l_name: string;
  is_active?: boolean;
}

export interface IPayloadToken {
  id: string;
  username: string;
}

export interface IChat {
  id: string;
}

export interface IChatUser {
  ChatId?: string;
  userId: string;
}

export interface IMessage {
  messageId?: string;
  chatId: string;
  userId: string;
  message: string;
}

export interface IChatUser {
  UserModelId: string;
  chatModelId: string;
}
export interface IAuthRequest extends Request {
  tokenPayload: IPayloadToken;
}
