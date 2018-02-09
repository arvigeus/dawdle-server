import { UUID, UUIDV4, BOOLEAN } from "sequelize";
import Model from "../sequelize";

const FriendRequest = Model.define("FriendRequest", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },

  // Cancelled friendships only affect the ability to send messages
  isCancelled: BOOLEAN
});

FriendRequest.associate = ({ User }) => {
  FriendRequest.belongsTo(User, {
    as: "CreatedBy",
    foreignKey: { field: "createdBy", allowNull: false }
  });
  FriendRequest.belongsTo(User, {
    as: "User",
    foreignKey: "userId"
  });
};

export default FriendRequest;
