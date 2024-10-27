import Chats from "../../components/Chats";
import Messages from "../../components/Messages";

export default function HomeChatApp() {
  return (
    <section className="grid h-screen w-full  grid-cols-6 bg-orange-600">
      <div className="col-span-2 border-r-2 border-s-teal-200 bg-slate-100">
        <Chats />
      </div>
      <div className="col-span-4 bg-white">
        <Messages />
      </div>
    </section>
  );
}
