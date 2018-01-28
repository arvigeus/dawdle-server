import { UUID, UUIDV4, STRING, ENUM, DATE, ARRAY } from "sequelize";
import Model from "../sequelize";

const Message = Model.define("Message", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },

  text: {
    type: STRING,
    validate: { allowNull: false }
  },

  status: {
    type: ENUM("sent", "delivered", "failed"),
    validate: { allowNull: false }
  },

  seenAt: DATE,

  tags: ARRAY(STRING)
});

Message.associate = ({ User }) => {
  Message.belongsTo(User, {
    as: "Sender",
    foreignKey: { field: "senderId", allowNull: false }
  });
  Message.belongsTo(User, {
    as: "Reciever",
    foreignKey: { field: "receiverId", allowNull: false }
  });
};

export default Message;
