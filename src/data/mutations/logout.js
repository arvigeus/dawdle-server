import {
  GraphQLBoolean as BooleanType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull
} from "graphql";

import UserDevice from "../models/UserDevice";

const login = {
  type: BooleanType,
  args: {
    id: { type: new NonNull(StringType) },
    token: { type: new NonNull(StringType) }
  },
  resolve: value => {
    // TODO: try/catch, format errors
    UserDevice.destroy({ where: { id, token } });
    return true;
  }
};

export default login;
