import { useEffect, useState } from "react";
import { authSlice, IChat } from "../types";
import { Api } from "../services";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CgAdd, CgClose } from "react-icons/cg";
import { BiSend } from "react-icons/bi";
import { RiChatNewLine } from "react-icons/ri";

const Search = () => {
  return (
    <>
      <div className="relative">
        <label htmlFor="Search" className="sr-only">
          {" "}
          Search{" "}
        </label>

        <input
          type="text"
          id="Search"
          placeholder="Search for..."
          className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
        />

        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button type="button" className="text-gray-600 hover:text-gray-700">
            <span className="sr-only">Search</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>
      </div>
    </>
  );
};

const NewChat = ({ showNewChat }) => {
  const auth: authSlice = useSelector((state) => state.authSlice);
  // const [showNewChat, setShowNewChat] = useState(false);

  const createChat = async () => {
    const response = await Api.createChat(auth.token, chat.userId, chat.msg);
    console.log("response", response.data);
  };
  const [chat, setChat] = useState({ userId: "", msg: "" });
  const onChangeHandler = (event) => {
    setChat({ ...chat, [event.target.name]: event.target.value });
  };
  const createChatHandler = () => {
    createChat();
  };

  return (
    <>
      {showNewChat && (
        <div className="   flex h-screen w-full flex-col bg-[#ffffff00]">
          <div className=" mt-10 flex flex-col space-y-4   p-4">
            <input
              className="rounded-lg"
              onChange={onChangeHandler}
              type="text"
              name="userId"
              placeholder="username"
            />
            <input
              className="rounded-lg"
              onChange={onChangeHandler}
              type="text"
              name="msg"
              placeholder="message"
            />
            <button
              onClick={createChatHandler}
              className="flex w-full items-center justify-center rounded-lg bg-green-500 p-4 text-white shadow-2xl hover:bg-white hover:text-green-500 "
            >
              <BiSend size={30} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default function Chats() {
  const [chats, setChats] = useState<IChat[]>();
  const [showNewChat, setShowNewChat] = useState(false);

  const auth: authSlice = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  const getChatsHandler = async () => {
    const response = await Api.getChats(auth.token);
    setChats(response.data);
  };

  useEffect(() => {
    getChatsHandler();
  }, []);

  return (
    <>
      <div className="relative h-screen w-full">
        <section className=" absolute z-0 flex w-full flex-col">
          {chats?.map((chat) => (
            <button
              onClick={(e) => {
                navigate(`/chat/${chat?.conversition.chat_id}`);
              }}
              className="m-2 border-b-2 p-4"
            >
              {/* <img
                src={`data:image/png;base64,${chat?.conversition?.image?.data?.toString("base64")}`}
                alt="Conversation Image"
              /> */}
              {chat?.conversition.f_name} {chat?.conversition.l_name}{" "}
            </button>
          ))}
        </section>
        <section className="relative z-40 bg-slate-200">
          <NewChat showNewChat={showNewChat} />
        </section>
        <section className="absolute bottom-4 right-4 ">
          <button
            className="relative z-50 rounded-full bg-green-500 p-3 text-white shadow-lg hover:bg-white hover:text-green-500"
            onClick={() => {
              setShowNewChat(!showNewChat);
            }}
          >
            {showNewChat ? (
              <CgClose size={40} color="#f05252" />
            ) : (
              <RiChatNewLine size={30} />
            )}
          </button>
        </section>
      </div>
    </>
  );
}
