import { GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";

import GraphQLFriend from "../types/GraphQLFriend";
import { requiresAuth } from "permissions";

export default {
  type: new GraphQLList(new GraphQLNonNull(GraphQLFriend)),
  args: { id: GraphQLString }, // Only manager can use that field
  resolve: requiresAuth.createResolver((parent, args, { models, user }) => {
    const id = args.id || user.id; // TODO: Disallow args.id for non-managers
    return models.Friend.findOne({ where: { createdBy: id } });
  })
};
