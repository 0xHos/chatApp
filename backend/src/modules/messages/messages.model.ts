import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db/connection";
import ChatModel from "../chat/chat.model";
import UserModel from "../auth/auth.model";

class MessageModel extends Model {}

MessageModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    chatId: {
      type: DataTypes.UUID,
      references: {
        model: ChatModel,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "MessageModel",
    paranoid: true,
  }
);

// MessageModel.hasMany(ChatModel);

export default MessageModel;
