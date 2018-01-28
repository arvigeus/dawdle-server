import { UUID, UUIDV4, STRING } from "sequelize";
import Model from "../sequelize";

const User = Model.define("User", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },

  email: {
    type: STRING(255),
    unique: true,
    validate: { isEmail: true }
  },

  phoneNumber: STRING(30)
});

User.associate = ({ Message, Friend }) => {
  User.hasMany(Message, {
    as: "SentMessages",
    foreignKey: { field: "senderId", allowNull: false }
  });
  User.hasMany(Message, {
    as: "RecievedMessages",
    foreignKey: { field: "receiverId", allowNull: false }
  });
  User.hasMany(Friend, {
    as: "Friends",
    foreignKey: { field: "createdBy", allowNull: false }
  });
};

export default User;
