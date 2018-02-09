import { UUID, UUIDV4, STRING, DATE } from "sequelize";
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

  phoneNumber: STRING(30),

  confirmedAt: DATE
});

User.associate = ({ Message, Friend, FriendRequest, Device, Note, Todo }) => {
  User.hasMany(Message, {
    as: "SentMessages",
    foreignKey: { field: "senderId", allowNull: false }
  });

  User.hasMany(Message, {
    as: "RecievedMessages",
    foreignKey: { field: "receiverId", allowNull: false }
  });

  User.hasMany(FriendRequest, {
    as: "SentFriendRequests",
    foreignKey: { field: "createdBy", allowNull: false }
  });

  User.hasMany(FriendRequest, {
    as: "RecievedFriendRequests",
    foreignKey: { field: "userId", allowNull: false }
  });

  User.hasMany(Friend, {
    as: "Friends",
    foreignKey: { field: "createdBy", allowNull: false }
  });

  User.hasMany(Device, {
    as: "Devices",
    foreignKey: { field: "userId", allowNull: false }
  });

  User.hasMany(Todo, {
    as: "Todos",
    foreignKey: { field: "userId", allowNull: false }
  });

  User.hasMany(Note, {
    as: "Notes",
    foreignKey: { field: "userId", allowNull: false }
  });
};

export default User;
