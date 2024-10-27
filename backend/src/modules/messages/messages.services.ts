import { IMessage } from "../../shared/types";
import MessagesModel from "./messages.model";

class MessagesServices {
  static async createMessage(message: IMessage): Promise<IMessage> {
    const new_message = await MessagesModel.create({ ...message });
    return new_message.toJSON() as IMessage;
  }

  static async deleteMessage(messageId: string): Promise<number> {
    const deleted_message = await MessagesModel.destroy({
      where: { id: messageId },
    });
    return deleted_message;
  }
}

export default MessagesServices;
