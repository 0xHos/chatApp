import sequelize from "./connection";
import "../../modules/auth/auth.model";
import "../../modules/chat/chat.model";
import "../../modules/messages/messages.model";
import AuthModel from "../../modules/auth/auth.model";
import ChatModel from "../../modules/chat/chat.model";

ChatModel.belongsTo(AuthModel, {
  foreignKey: "userId",
});
export const createTables = () => {
  sequelize
    .sync()
    .then(() => {
      console.log("Tables created successfully");
    })
    .catch((err) => {
      console.log("Error creating tables", err);
    });
};
