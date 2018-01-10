import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLList as List
} from "graphql";

const ResponseType = new ObjectType({
  name: "UserResponse",
  fields: {
    ok: { type: new NonNull(BooleanType) },
    errors: { type: new List(new NonNull(StringType)) }
  }
});

export default ResponseType;
