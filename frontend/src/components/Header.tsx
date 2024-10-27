import { Avatar, Button } from "flowbite-react";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { MdModeEditOutline, MdOutlineAccountBox } from "react-icons/md";
import { TfiAlignJustify } from "react-icons/tfi";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

function MenuOfAvatar() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="absolute right-0 w-60 border-2  shadow-lg">
      <button className="flex gap-3 p-3">
        <span>Edit profile </span> <MdModeEditOutline />
      </button>
      <button className="flex gap-3  p-3" onClick={handleLogout}>
        <span>Logout</span> <FiLogOut />
      </button>
    </div>
  );
}

export default function Header() {
  const [showMenuOfAvatar, setShowMenuOfAvatar] = useState(false);
  const handelShowMenuOfAvatar = () => {
    setShowMenuOfAvatar(!showMenuOfAvatar);
  };

  return (
    <nav>
      {/* <section className="bg-secondary flex justify-between p-5 shadow-sm">
        <Button>
          <TfiAlignJustify size={20} />
        </Button>
        <Avatar
          className="cursor-pointer"
          onClick={handelShowMenuOfAvatar}
          img={"https://flowbite-react.com/images/people/profile-picture-5.jpg"}
          rounded
        />
      </section>
      {showMenuOfAvatar && <MenuOfAvatar />} */}
    </nav>
  );
}
