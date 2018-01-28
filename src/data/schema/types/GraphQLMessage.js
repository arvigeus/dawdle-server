import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLEnumType
} from "graphql";

import { GraphQLDateTime } from "graphql-iso-date";

const GraphQLMessageStatus = new GraphQLEnumType({
  name: "MessageStatus",
  values: {
    sent: { value: "sent" },
    delivered: { value: "delivered" },
    failed: { value: "failed" }
  }
});

const GraphQLMessage = new GraphQLObjectType({
  name: "Message",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLMessageStatus) },
    seenAt: { type: GraphQLDateTime },
    tags: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
    createdAt: { type: new GraphQLNonNull(GraphQLDateTime) },
    updatedAt: { type: GraphQLDateTime }
  }
});

export const GraphQLMessageResponse = new GraphQLObjectType({
  name: "MessageResponse",
  fields: {
    ok: { type: new GraphQLNonNull(GraphQLMessageStatus) },
    message: { type: GraphQLMessage },
    errors: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) }
  }
});

export default GraphQLMessage;
