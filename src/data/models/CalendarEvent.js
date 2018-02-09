import { UUID, UUIDV4, STRING, DATE, ENUM, ARRAY } from "sequelize";
import Model from "../sequelize";

// TODO: Use device for sending notifications
const CalendarEvent = Model.define("CalendarEvent", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },

  title: STRING(100),

  picture: {
    type: STRING,
    validate: { isUrl: true }
  },

  startTime: DATE,

  endTime: DATE,

  recurrence: ENUM("hourly", "daily", "weekly", "monthly", "yearly"),

  nextStartDate: DATE,

  nextEndDate: DATE,

  address: STRING(250),

  description: STRING(4000),

  tags: ARRAY(STRING),

  // If not null will send notification to user
  remindMeAt: DATE
});

CalendarEvent.associate = ({ User, Friend }) => {
  CalendarEvent.belongsTo(User, {
    as: "CreatedBy",
    foreignKey: { field: "createdBy", allowNull: false }
  });

  CalendarEvent.belongsTo(Friend, {
    as: "Friend",
    foreignKey: { field: "friendId", allowNull: false }
  });
};

export default CalendarEvent;
