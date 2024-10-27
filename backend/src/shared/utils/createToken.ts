import { sign } from "jsonwebtoken";
import { IPayloadToken } from "../types";

export const JWT_SECKRET_KEY = process.env.JWT_SECRET_KEY as string;
export default function createToken(payload: IPayloadToken): string {
  const token = sign(payload, JWT_SECKRET_KEY);
  return token;
}
