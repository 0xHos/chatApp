import { useParams } from "react-router-dom";
import { Api } from "../services";
import { useSelector } from "react-redux";
import { authSlice } from "../types";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SERVER_BACKEND } from "../constants/endpoints";
import { BiSend } from "react-icons/bi";

const SendMessage = ({
  chatId,
  socket,
}: {
  chatId: string;
  socket: Socket;
}) => {
  const [msg, setMsg] = useState("");
  const auth: authSlice = useSelector((state) => state.authSlice);

  const sendMessageHandler = () => {
    Api.createMessage(auth.token, chatId, msg);
    socket.emit("new_message", { chatId, userId: auth.userId, message: msg });
    setMsg(""); // Clear the input after sending
  };

  const setMessageHandler = (e) => setMsg(e.target.value);

  return (
    <div className="flex p-2 ">
      <input
        id="OrderNotes"
        className="mt-2   w-[90%] rounded-lg border-2  border-slate-300 p-3 shadow-sm sm:text-sm"
        placeholder="Enter Message ........."
        value={msg}
        onChange={setMessageHandler}
      ></input>
      <button
        onClick={sendMessageHandler}
        className=" rounded-lg  p-4 text-green-600 shadow-2xl hover:bg-white hover:text-green-500 "
      >
        <BiSend size={40} />
      </button>
    </div>
  );
};

export default function Messages() {
  const socket = io(SERVER_BACKEND);
  const { id } = useParams();
  const [msgs, setMsgs] = useState([]); // Initialize as an empty array
  const auth: authSlice = useSelector((state) => state.authSlice);
  const refMessages = useRef<HTMLElement>();
  const getMessages = async () => {
    const messages = await Api.getMessagesForChat(auth.token, id);
    setMsgs(messages.data); // Assuming messages.data is an array of objects
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("User connected");
      socket.emit("joinToChat", { chatId: id });
    });

    return () => socket.disconnect();
  }, [id, socket]);

  useEffect(() => {
    getMessages();
  }, [id]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMsgs((prev) => [...prev, { message: data.message }]);

      refMessages.current?.scrollTo({
        top: refMessages.current.scrollHeight,
      });
    });

    return () => socket.off("receive_message");
  }, [socket]);

  return (
    <>
      <div className="flex h-screen w-full flex-col ">
        <section
          className="flex h-[88%] flex-col space-y-4 overflow-y-auto py-4"
          ref={refMessages}
        >
          {msgs?.map((m, index) =>
            m.userId == auth.userId ? (
              <div key={index} className="flex w-full justify-end space-x-2">
                <div className="mr-4 w-fit bg-blue-500 p-2">
                  {m.message} {m.userId}
                </div>
              </div>
            ) : (
              <div key={index} className="flex w-full justify-start space-x-2">
                <div className="ml-4 w-fit bg-slate-100 p-2">{m.message}</div>
              </div>
            ),
          )}
        </section>
        <section className=" h-[10%]  w-full ">
          <SendMessage chatId={id!} socket={socket} />
        </section>
      </div>
    </>
  );
}
