import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean
} from "graphql";

import { GraphQLDateTime } from "graphql-iso-date";

const GraphQLNote = new GraphQLObjectType({
  name: "Note",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: new GraphQLNonNull(GraphQLString) },
    tags: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
    createdAt: { type: new GraphQLNonNull(GraphQLDateTime) },
    updatedAt: { type: GraphQLDateTime }
  }
});

export const GraphQLNoteResponse = new GraphQLObjectType({
  name: "NoteResponse",
  fields: {
    ok: { type: new GraphQLNonNull(GraphQLBoolean) },
    note: { type: GraphQLNote },
    errors: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) }
  }
});

export default GraphQLNote;
