import UserType from "../types/UserType";
import User from "../models/User";

const users = {
  type: UserType,
  resolve: () => User.findAll()
};

export default users;
