import { Button, Label, TextInput } from "flowbite-react";
import { TypeAnimation } from "react-type-animation";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { IUser } from "../../types";
import { Api } from "../../services";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

const checkRepetPassword = (password: string, repassword: string): boolean => {
  return password === repassword;
};

export default function Signup() {
  const [imageBase64, setImageBase64] = useState("");
  const handleFileChange = (event) => {
    console.log(event.currentTarget.files[0].type);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      setImageBase64(base64);
      // formik.setFieldValue("image", imageBase64);
    };
    reader.readAsDataURL(event.currentTarget.files[0]);
  };
  const [errorPassword, setErrorPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const creatUserHandler = async (user: IUser) => {
    const result = await Api.signup(user);
    result.error ? setIsError(true) : setIsError(false);
    setMessage(result.message);
    isError &&
      setTimeout(() => {
        navigate(routes.auth.login);
      }, 2000);
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    f_name: yup.string().required("First name is required"),
    l_name: yup.string().required("Last name is required"),
    password: yup.string().required("Password is required"),
    repassword: yup.string().required("Repeat Password is required"),
  });
  const initialValues = {
    // image: "",
    username: "",
    f_name: "",
    l_name: "",
    password: "",
    repassword: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      checkRepetPassword(values.password, values.repassword) == false
        ? setErrorPassword(true)
        : setErrorPassword(false);

      if (errorPassword == false) {
        creatUserHandler({ ...values, image: imageBase64 });
      }
    },
  });
  return (
    <>
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
              sequence={["SIGNUP", 10000]}
              cursor={false}
              wrapper={"span"}
            />
          </h2>
          {errorPassword ? (
            <div className="mb-2 block border-x-2 border-red-700  bg-red-300 p-2">
              <span className="text-red-700">Passwords do not match</span>
            </div>
          ) : null}

          {
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
          }

          <div className="relative ">
            {/* <div className="w-full ">
              {imageBase64 ? (
                <img
                  className=" size-60 rounded-full"
                  src={imageBase64}
                  alt="Room Image"
                />
              ) : (
                <div className="size-60 rounded-full bg-slate-100"></div>
              )}
            </div> */}
            {/* <input
              className="absolute top-0 z-10 h-full w-full border-2 border-slate-500 p-2 py-3 opacity-0 "
              type="file"
              name="image"
              placeholder="Room Image"
              onChange={handleFileChange}
              required */}
            {/* /> */}
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="username"
                value="Username"
                className="text-primary"
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
                htmlFor="f_name"
                value="First Name"
                className="text-primary"
              />
            </div>
            <TextInput
              id="f_name"
              type="text"
              placeholder="First Name"
              name="f_name"
              sizing={"lg"}
              value={formik.values.f_name}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="l_name"
                value="Last Name"
                className="text-primary"
              />
            </div>
            <TextInput
              id="l_name"
              type="text"
              placeholder="Last Name"
              name="l_name"
              sizing={"lg"}
              value={formik.values.l_name}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password2"
                value="Your password"
                className="text-primary"
              />
            </div>
            <TextInput
              id="password2"
              type="password"
              name="password"
              placeholder="Password"
              sizing={"lg"}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="repeat-password"
                value="Repeat password"
                className="text-primary"
              />
            </div>
            <TextInput
              id="epeat-password"
              type="password"
              name="repassword"
              placeholder="Repeat password"
              sizing={"lg"}
              value={formik.values.repassword}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex items-center gap-2"></div>
          <Button size={"lg"} type="submit" className="bg-primary font-bold">
            Create Account
          </Button>
        </form>
      </section>
    </>
  );
}
