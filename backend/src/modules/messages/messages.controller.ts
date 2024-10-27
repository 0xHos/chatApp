import { Request, Response } from "express";
import { IMessage } from "../../shared/types";
import MessagesServices from "./messages.services";

async function createMessage(req: Request, res: Response) {
  try {
    console.log("test new req", req.body);
    const message = req.body as IMessage;
    const new_message = await MessagesServices.createMessage(message);
    console.log("Message created successfully");
    res
      .status(200)
      .json({ message: "Message created successfully", data: new_message });
  } catch (err) {
    console.log("error while creating message", err);
    res.status(500).json({ message: "error while creating message" });
  }
}

export { createMessage };
