import DataType from "sequelize";
import Model from "../sequelize";

const Message = Model.define("Message", {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  },

  text: {
    type: DataType.STRING,
    validate: { allowNull: false }
  },

  status: {
    type: DataType.ENUM("sent", "delivered", "failed"),
    validate: { allowNull: false }
  },

  seenAt: DataType.Date
});

Message.associate = models => {
  Message.belongsTo(models.User, {
    as: "Sender",
    foreignKey: { field: "senderId", allowNull: false }
  });
  Message.belongsTo(models.User, {
    as: "Reciever",
    foreignKey: { field: "receiverId", allowNull: false }
  });
};

export default Message;
