import { IChat } from "../types";

export default function Chat(chat: IChat) {
  return (
    <div>
      <h1 className="w-full border-b-2 text-red-700 ">
        {chat.user?.f_name} {chat.user?.l_name}
      </h1>
    </div>
  );
}
