import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType
} from "graphql";

import queries from "./queries";
import mutations from "./mutations";

const schema = new Schema({
  query: new ObjectType({
    name: "Query",
    fields: queries
  }),
  mutation: new ObjectType({
    name: "Mutation",
    fields: mutations
  })
});

export default schema;
