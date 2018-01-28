import { UUID, UUIDV4, STRING, DATE } from "sequelize";
import Model from "../sequelize";

const Friend = Model.define("Friend", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },

  email: {
    type: STRING(255),
    validate: { isEmail: true }
  },

  phoneNumber: STRING(30),

  name: STRING(50),

  birthdate: DATE,

  gender: STRING(50),

  picture: {
    type: STRING,
    validate: { isUrl: true }
  },

  country: STRING(50),

  city: STRING(50),

  address: STRING(100),

  occupation: STRING(100),

  description: STRING(4000)
});

Friend.associate = ({ User, Friend, Note }) => {
  Friend.belongsTo(User, {
    as: "CreatedBy",
    foreignKey: { field: "createdBy", allowNull: false }
  });
  // A user may create friend for non existing user, then userId would be null
  // When that friend registers in the system, it can be connected with that user
  Friend.belongsTo(User, {
    as: "User",
    foreignKey: "userId"
  });
  Friend.hasMany(Note, {
    as: "Notes",
    foreignKey: { field: "friendId", allowNull: false }
  });
};

export default Friend;
