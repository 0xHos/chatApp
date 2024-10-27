import { IUser } from "../../shared/types";
import encrPassword from "../../shared/utils/encPassword";
import AuthModel from "./auth.model";

export class AuthService {
  static async createUser(user: IUser): Promise<IUser> {
    user.password = await encrPassword(user.password);
    const new_user = await AuthModel.create({ ...user });
    return new_user.toJSON() as IUser;
  }

  static async getUserByUsername(username: string): Promise<IUser> {
    const user = await AuthModel.findOne({ where: { username } });
    return user?.toJSON() as IUser;
  }

  static async getUserById(id: string): Promise<IUser> {
    const user = await AuthModel.findOne({ where: { id } });
    return user?.toJSON() as IUser;
  }
}
