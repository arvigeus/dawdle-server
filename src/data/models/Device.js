import { UUID, UUIDV4, STRING } from "sequelize";
import Model from "../sequelize";

const Device = Model.define("Device", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },

  name: STRING,

  token: STRING
});

Device.associate = ({ User }) => {
  Device.belongsTo(User, {
    as: "Owner",
    foreignKey: { field: "userId", allowNull: false }
  });
};

export default Device;
