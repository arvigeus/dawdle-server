import GraphQLUser from "../types/GraphQLUser";
import { requiresAuth } from "permissions";

export default {
  type: GraphQLUser,
  resolve: requiresAuth.createResolver((parent, args, { models, user }) =>
    models.User.findOne({ where: { id: user.id } })
  )
};
