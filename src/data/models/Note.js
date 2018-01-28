import { UUID, UUIDV4, STRING, ARRAY } from "sequelize";
import Model from "../sequelize";

const Note = Model.define("Note", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },

  text: {
    type: STRING(500),
    validate: { allowNull: false }
  },

  tags: ARRAY(STRING)
});

Note.associate = ({ User, Friend }) => {
  Note.belongsTo(User, {
    as: "CreatedBy",
    foreignKey: { field: "createdBy", allowNull: false }
  });
  Note.belongsTo(Friend, {
    as: "Friend",
    foreignKey: { field: "friendId", allowNull: false }
  });
};

export default Note;
