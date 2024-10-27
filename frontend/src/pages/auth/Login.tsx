import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services";
import { routes } from "../../constants/routes";
import * as yup from "yup";
import { IUser } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { login, setAuth } from "../../store/authSlice";

export default function Login() {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();

  const loginHandler = async (user: IUser) => {
    const result = await Api.login(user);
    console.log(result);
    result.error ? setIsError(true) : setIsError(false);
    setMessage(result.message);
    if (result.error == false) {
      console.log("submit");
      dispatch(setAuth({ token: result?.token, userId: result.userId }));
      dispatch(login());
      navigate(routes.home);
    }
  };
  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });
  const initialValues = {
    username: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      loginHandler({ ...values });
    },
  });

  useEffect(() => {
    const session = sessionStorage.getItem("token");
    console.log("session", session);
    if (session) {
      console.log("session dispatch", session);

      dispatch(setAuth({ token: session }));
      dispatch(login());
    }
  }, []);

  return (
    <section className="flex h-screen  w-full items-center justify-center">
      <form
        className="flex w-full max-w-md flex-col gap-4 md:w-1/2"
        onSubmit={formik.handleSubmit}
      >
        <h1 className=" mb-10 text-center text-2xl font-bold text-white">
          <span className="bg-primary  ">
            <TypeAnimation
              sequence={["CHATT", 1000]}
              cursor={false}
              wrapper={"span"}
            />
          </span>
          <span className="text-primary">ING</span>
        </h1>
        <h2 className="text-center text-2xl font-bold text-primary">
          <TypeAnimation
            sequence={["LOGIN", 10000]}
            cursor={false}
            wrapper={"span"}
          />
        </h2>
        <div>
          {message ? (
            isError ? (
              <span className="mb-2 block border-x-2 border-red-700 bg-red-100  p-2 text-red-800">
                {message}
              </span>
            ) : (
              <span className="mb-2 block border-x-2 border-green-700 bg-green-100  p-2 text-green-800">
                {message}
              </span>
            )
          ) : null}
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="username"
              className="text-primary"
              value="Username"
            />
          </div>
          <TextInput
            id="username"
            type="text"
            placeholder="Username"
            name="username"
            sizing={"lg"}
            value={formik.values.username}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="password1"
              value="Your password"
              className="text-primary"
            />
          </div>
          <TextInput
            id="password1"
            type="password"
            name="password"
            placeholder="password"
            sizing={"lg"}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label className="text-primary" htmlFor="remember">
            Remember me
          </Label>
        </div>
        <Button size={"lg"} type="submit" className="bg-primary font-bold">
          Submit
        </Button>
      </form>
    </section>
  );
}
