import { GraphQLString, GraphQLNonNull } from "graphql";
import GraphQLUser from "../types/GraphQLUser";

export default {
  type: GraphQLUser,
  args: {
    id: new GraphQLNonNull(GraphQLString)
  },
  resolve: (parent, { id }, { models }) =>
    models.User.findOne({ where: { id } })
};
