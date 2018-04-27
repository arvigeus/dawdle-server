import { UUID, UUIDV4, BOOLEAN } from "sequelize";
import Model from "../sequelize";

const FriendRequest = Model.define("FriendRequest", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  
  status: {
    type: ENUM("pending", "approved", "declined"),
    validate: { allowNull: false }
  },
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
