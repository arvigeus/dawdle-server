import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList
} from "graphql";

import { GraphQLDateTime } from "graphql-iso-date";

const GraphQLDevice = new GraphQLObjectType({
  name: "Device",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    token: { type: new GraphQLNonNull(GraphQLString) },
    confirmedAt: { type: GraphQLDateTime },
    lastLogin: { type: GraphQLDateTime },
    createdAt: { type: new GraphQLNonNull(GraphQLDateTime) },
    updatedAt: { type: GraphQLDateTime }
  }
});

export const GraphQLDeviceResponse = new GraphQLObjectType({
  name: "DeviceResponse",
  fields: {
    ok: { type: new GraphQLNonNull(GraphQLBoolean) },
    device: { type: GraphQLDevice },
    errors: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) }
  }
});

export default GraphQLDevice;
