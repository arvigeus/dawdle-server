import DataType from "sequelize";
import Model from "../sequelize";

const User = Model.define("UserDevice", {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true
  },

  name: DataType.STRING,

  token: DataType.STRING
});

export default User;
