import { useSelector } from "react-redux";
import Login from "./pages/auth/Login";

interface PrivateLayout {
  children: JSX.Element;
}

export default function PrivateLayout({ children }: PrivateLayout) {
  const auth = useSelector((state) => state.authSlice);
  console.log(auth);
  return <>{auth.isLogin && auth.token ? <>{children}</> : <Login />}</>;
}
