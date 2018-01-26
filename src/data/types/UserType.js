import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLList as List
} from "graphql";

import { GraphQLDateTime as DateTime } from "graphql-iso-date";

const UserType = new ObjectType({
  name: "User",
  fields: {
    id: { type: new NonNull(ID) },
    email: { type: StringType },
    givenName: { type: StringType },
    familyName: { type: StringType },
    picture: { type: StringType },
    country: { type: StringType },
    city: { type: StringType },
    birthdate: { type: DateTime },
    phoneNumber: { type: StringType },
    createdAt: { type: new NonNull(DateTime) },
    updatedAt: { type: DateTime }
  }
});

export const UserResponseType = new ObjectType({
  name: "UserResponse",
  fields: {
    ok: { type: new NonNull(BooleanType) },
    user: { type: UserType },
    errors: { type: new List(new NonNull(StringType)) }
  }
});

export default UserType;
