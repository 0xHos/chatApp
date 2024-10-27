import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECKRET_KEY } from "../shared/utils/createToken";
import { IPayloadToken } from "../shared/types";

export default function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["auth"] as string;
  if (!token) {
    res.status(401).json({ msg: "Token not provided" });
  }
  const decodedToken = verify(token, JWT_SECKRET_KEY) as IPayloadToken;

  if (!decodedToken) {
    res.status(401).json({ msg: "Invalid token" });
  }
  req.body = { ...req.body, userId: decodedToken.id };
  console.log("decodedToken", decodedToken);
  next();
}
