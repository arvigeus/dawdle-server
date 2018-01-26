import DataType from "sequelize";
import Model from "../sequelize";

const User = Model.define("User", {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  },

  email: {
    type: DataType.STRING(255),
    unique: true,
    validate: { isEmail: true }
  },

  givenName: DataType.STRING,

  familyName: DataType.STRING,

  picture: {
    type: DataType.STRING,
    validate: { isUrl: true }
  },

  gender: DataType.STRING(50),

  country: DataType.STRING,

  city: DataType.STRING,

  birthdate: DataType.DATE,

  phoneNumber: DataType.STRING
});

User.associate = models => {
  User.hasMany(models.Messages, {
    as: "SentMessages",
    foreignKey: { field: "senderId", allowNull: false }
  });
  User.hasMany(models.Messages, {
    as: "RecievedMessages",
    foreignKey: { field: "receiverId", allowNull: false }
  });
};

export default User;
