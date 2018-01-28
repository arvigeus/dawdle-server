import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLEnumType,
  GraphQLBoolean
} from "graphql";

import { GraphQLDateTime } from "graphql-iso-date";

const GraphQLRecurrence = new GraphQLEnumType({
  name: "Recurrence",
  values: {
    hourly: { value: "hourly" },
    daily: { value: "daily" },
    weekly: { value: "weekly" },
    monthly: { value: "monthly" },
    yearly: { value: "yearly" }
  }
});

const GraphQLCalendarEvent = new GraphQLObjectType({
  name: "CalendarEvent",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    picture: { type: GraphQLString },
    startDate: { type: GraphQLDateTime },
    endDate: { type: GraphQLDateTime },
    recurrence: { type: GraphQLRecurrence },
    nextStartDate: { type: GraphQLDateTime },
    nextEndDate: { type: GraphQLDateTime },
    address: { type: GraphQLString },
    description: { type: GraphQLString },
    tags: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
    remindMe: { type: new GraphQLNonNull(GraphQLBoolean) },
    createdAt: { type: new GraphQLNonNull(GraphQLDateTime) },
    updatedAt: { type: GraphQLDateTime }
  }
});

export const GraphQLCalendarEventResponse = new GraphQLObjectType({
  name: "CalendarEventResponse",
  fields: {
    ok: { type: new GraphQLNonNull(GraphQLBoolean) },
    event: { type: GraphQLCalendarEvent },
    errors: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) }
  }
});

export default GraphQLCalendarEvent;
