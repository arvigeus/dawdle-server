import { UUID, UUIDV4, REAL, DATE, ENUM, INTEGER } from "sequelize";
import Model from "../sequelize";

/**
 * @enum {InteractionType}
 */
const InteractionType = {
  note: 1,
  todo: 2,
  event: 3,
  message: 4
};

const FriendshipStatus = Model.define("FriendshipStatus", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },

  // NULL: friend request sent
  // -100: users are blocked from contacting each other
  health: {
    type: REAL,
    validate: { min: -100, max: 100 }
  },

  lastIterationDate: DATE,

  lastIterationType: ENUM(...InteractionType.keys),

  todayIterationCount: {
    type: INTEGER,
    defaultValue: 0,
    validate: { allowNull: false, min: 0 }
  }
});

/**
 * Update health status when interacting between two users
 * @param {InteractionType} type - Type of iteraction
 */
FriendshipStatus.Instance.prototype.interaction = type => {
  const interactionWeight = InteractionType[type]; // If null just perform health status check
  // TODO: Implement this
  // Update todayIterationCount (set 1 if date is lastIterationDate is different)
  // After each iteration health will increase with slower rate
  // Different types has different weight
  // TODO: Write formula
};

FriendshipStatus.associate = ({ User }) => {
  FriendshipStatus.belongsTo(User, {
    as: "Initiator",
    foreignKey: { field: "initiatorId", allowNull: false }
  });
  FriendshipStatus.belongsTo(User, {
    as: "Respondent",
    foreignKey: { field: "respondentId", allowNull: false }
  });
};

export default FriendshipStatus;
