import { Router } from "express";
import { createMessage } from "./messages.controller";

const messagesRouter = Router();

messagesRouter.post("/", createMessage);

export default messagesRouter;
