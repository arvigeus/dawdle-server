import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList
} from "graphql";

const GraphQLResponse = new GraphQLObjectType({
  name: "Response",
  fields: {
    ok: { type: new GraphQLNonNull(GraphQLBoolean) },
    errors: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) }
  }
});

export default GraphQLResponse;
