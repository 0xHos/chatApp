import { Response, Request } from "express";
import { AuthService } from "./auth.services";
import { IUser } from "../../shared/types";
import checkPassword from "../../shared/utils/checkPassword";
import createToken from "../../shared/utils/createToken";

async function signup(req: Request, res: Response): Promise<void> {
  try {
    const user: IUser = req.body as IUser;
    const result = await AuthService.createUser(user);
    console.log("User created success");
    res.status(201).json({ message: "user created success", data: { result } });
  } catch (err) {
    console.error("Error while signup user", err);
    res.status(500).json({ message: "error while signup user" });
  }
}

async function login(req: Request, res: Response): Promise<void> {
  try {
    const user: IUser = req.body as IUser;
    const user_found = await AuthService.getUserByUsername(user.username);
    if (!user_found) {
      res.status(500).json({ message: "error while login user" });
    }
    const is_password_correct = await checkPassword(
      user.password,
      user_found.password
    );
    if (!is_password_correct) {
      res.status(401).json({ message: "invalid password or username" });
    }
    const token = createToken({
      id: user_found.id!,
      username: user_found.username,
    });
    res.status(200).json({
      message: "user logged in successfully",
      data: { token: token, userId: user_found.id! },
    });
  } catch (err) {
    console.error("Error while login user");
  }
}
export { signup, login };
