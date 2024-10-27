import { Route, Routes } from "react-router-dom";
import { routes } from "../constants/routes";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import HomeChatApp from "../pages/app/HomeChatApp";
import Layout from "../Layout/Layout";
import PrivateLayout from "../PrivateLayout";
import Messages from "../components/Messages";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path={routes.auth.login} element={<Login />} />
        <Route path={routes.auth.register} element={<Signup />} />
        <Route element={<PrivateLayout children={<Layout />} />}>
          <Route path={routes.home} element={<HomeChatApp />}>
            <Route path={routes.chat} element={<Messages />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
