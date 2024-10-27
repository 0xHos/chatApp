import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db/connection";
import UserModel from "../auth/auth.model";
import MessageModel from "../messages/messages.model";

class ChatModel extends Model {}

ChatModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  },

  { modelName: "chatModel", sequelize: sequelize, paranoid: true }
);

export const UserChatModel = sequelize.define("UserChatModel", {});
UserModel.belongsToMany(ChatModel, {
  through: UserChatModel,
  foreignKey: "UserModelId",
});
ChatModel.belongsToMany(UserModel, {
  through: UserChatModel,
  foreignKey: "chatModelId",
});
ChatModel.hasMany(MessageModel, { foreignKey: "chatId" });

export default ChatModel;
