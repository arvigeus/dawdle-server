import { GraphQLList, GraphQLNonNull } from "graphql";
import GraphQLUser from "../types/GraphQLUser";

export default {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLUser))),
  resolve: (parent, args, { models }) => models.User.findAll()
};
