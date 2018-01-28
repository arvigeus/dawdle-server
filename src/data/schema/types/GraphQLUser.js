import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList
} from "graphql";

import { GraphQLDateTime } from "graphql-iso-date";

const GraphQLUser = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
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
