import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull
} from "graphql";

import { GraphQLDateTime } from "graphql-iso-date";

const GraphQLFriendRequest = new GraphQLObjectType({
  name: "FriendRequest",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: GraphQLString },
    isCancelled: { type: GraphQLBoolean },
    createdAt: { type: new GraphQLNonNull(GraphQLDateTime) },
    updatedAt: { type: GraphQLDateTime }
  }
});

export default GraphQLFriendRequest;
