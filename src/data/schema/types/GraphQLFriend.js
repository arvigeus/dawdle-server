import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList
} from "graphql";

import { GraphQLDateTime } from "graphql-iso-date";

import GraphQLUser from "./GraphQLUser";
import GraphQLCalendarEvent from "./GraphQLCalendarEvent";
import GraphQLNote from "./GraphQLNote";
import GraphQLTodo from "./GraphQLTodo";

const GraphQLFriend = new GraphQLObjectType({
  name: "Friend",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    name: { type: GraphQLString },
    birthdate: { type: GraphQLDateTime },
    gender: { type: GraphQLString },
    picture: { type: GraphQLString },
    country: { type: GraphQLString },
    city: { type: GraphQLString },
    address: { type: GraphQLString },
    occupation: { type: GraphQLString },
    description: { type: GraphQLString },
    createdBy: { type: new GraphQLNonNull(GraphQLUser) },
    user: { type: GraphQLUser },
    events: { type: new GraphQLList(new GraphQLNonNull(GraphQLCalendarEvent)) },
    notes: { type: new GraphQLList(new GraphQLNonNull(GraphQLNote)) },
    todos: { type: new GraphQLList(new GraphQLNonNull(GraphQLTodo)) },
    createdAt: { type: new GraphQLNonNull(GraphQLDateTime) },
    updatedAt: { type: GraphQLDateTime }
  }
});

export const GraphQLFriendResponse = new GraphQLObjectType({
  name: "FriendResponse",
  fields: {
    ok: { type: new GraphQLNonNull(GraphQLBoolean) },
    friend: { type: GraphQLFriend },
    errors: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) }
  }
});

export default GraphQLFriend;
