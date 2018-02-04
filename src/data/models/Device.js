import { UUID, UUIDV4, STRING, DATE } from "sequelize";
import bcrypt from "bcrypt";
import Model from "../sequelize";

const Device = Model.define(
  "Device",
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },

    name: STRING,

    token: {
      type: STRING,
      validate: { allowNull: false }
    },

    confirmedAt: DATE,

    lastLogin: DATE
  },
  {
    hooks: {
      afterValidate: async device => {
        // eslint-disable-next-line no-param-reassign
        device.token = await bcrypt.hash(device.token, 12);
      }
    }
  }
);

Device.associate = ({ User }) => {
  Device.belongsTo(User, {
    as: "Owner",
    foreignKey: { field: "userId", allowNull: false }
  });
};

export default Device;
