export interface IUser {
  image: string;
  id?: string;
  username: string;
  password: string;
  f_name: string;
  l_name: string;
  is_active?: boolean;
}

export interface IChat {
  id?: string;
  userId: string;
  user: IUser;
}

export interface IMessage {
  id?: string;
  chatId: string;
  userId: string;
  message: string;
}

export interface authSlice {
  isLogin: boolean;
  token: string;
  userId: string;
}
