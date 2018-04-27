import CalendarEvent from "./CalendarEvent";
import Device from "./Device";
import Friend from "./Friend";
import FriendRequest from "./FriendRequest";
import Message from "./Message";
import Note from "./Note";
import Todo from "./Todo";
import User from "./User";

export default {
  Query: {
    ...CalendarEvent.Query,
    ...Device.Query,
    ...Friend.Query,
    ...FriendRequest.Query,
    ...Message.Query,
    ...Note.Query,
    ...Todo.Query,
    ...User.Query,
  },
  Mutation: {
    ...CalendarEvent.Mutation,
    ...Device.Mutation,
    ...Friend.Mutation,
    ...FriendRequest.Mutation,
    ...Message.Mutation,
    ...Note.Mutation,
    ...Todo.Mutation,
    ...User.Mutation,
  }
}