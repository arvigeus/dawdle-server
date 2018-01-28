import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean
} from "graphql";

import { GraphQLDateTime } from "graphql-iso-date";

const GraphQLTodo = new GraphQLObjectType({
  name: "Todo",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: new GraphQLNonNull(GraphQLString) },
    tags: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
    endDate: { type: GraphQLDateTime },
    isCompleted: { type: new GraphQLNonNull(GraphQLBoolean) },
    createdAt: { type: new GraphQLNonNull(GraphQLDateTime) },
    updatedAt: { type: GraphQLDateTime }
  }
});

export const GraphQLTodoResponse = new GraphQLObjectType({
  name: "TodoResponse",
  fields: {
    ok: { type: new GraphQLNonNull(GraphQLBoolean) },
    todo: { type: GraphQLTodo },
    errors: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) }
  }
});

export default GraphQLTodo;
