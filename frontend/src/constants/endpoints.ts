export const API_SERVER = "http://127.0.0.1:8080/api";
export const SERVER_BACKEND = "http://127.0.0.1:8080";

export const endpoints = {
  auh: {
    signup: `${API_SERVER}/auth/createUser`,
    login: `${API_SERVER}/auth/login`,
  },
  chat: {
    createChat: `${API_SERVER}/chat/createChat`,
    chats: `${API_SERVER}/chat`,
  },
};
