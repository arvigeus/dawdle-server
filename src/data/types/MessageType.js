import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLEnumType as EnumType
} from "graphql";

import { GraphQLDateTime as DateTime } from "graphql-iso-date";

const MessageStatusType = new EnumType({
  name: "MessageStatus",
  values: {
    sent: { value: 1 },
    delivered: { value: 2 },
    failed: { value: 2 }
  }
});

const MessageType = new ObjectType({
  name: "Message",
  fields: {
    id: { type: new NonNull(ID) },
    text: { type: new NonNull(StringType) },
    status: { type: new NonNull(MessageStatusType) },
    seenAt: { type: DateTime },
    createdAt: { type: new NonNull(DateTime) },
    updatedAt: { type: DateTime }
  }
});

export const MessageResponseType = new ObjectType({
  name: "MessageResponse",
  fields: {
    ok: { type: new NonNull(MessageStatusType) },
    message: { type: MessageType },
    errors: { type: new List(new NonNull(StringType)) }
  }
});

export default MessageType;
