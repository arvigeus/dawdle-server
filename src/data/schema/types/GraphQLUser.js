import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList
} from "graphql";

import { GraphQLDateTime } from "graphql-iso-date";
import GraphQLFriendRequest from "./GraphQLFriendRequest";
import GraphQLFriend from "./GraphQLFriend";
import GraphQLDevice from "./GraphQLDevice";

const GraphQLUser = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    friends: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLFriend))
      )
    },
    sentRequests: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLFriendRequest))
    },
    receivedRequests: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLFriendRequest))
    },
    devices: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLDevice))
      )
    },
    createdAt: { type: new GraphQLNonNull(GraphQLDateTime) },
    updatedAt: { type: GraphQLDateTime }
  }
});

export const GraphQLUserResponse = new GraphQLObjectType({
  name: "UserResponse",
  fields: {
    ok: { type: new GraphQLNonNull(GraphQLBoolean) },
    user: { type: GraphQLUser },
    errors: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) }
  }
});

export default GraphQLUser;
