import { requiresAuth } from "permissions";
import search from "lib/fuzzySearch";

export default {
  Query: {
    notes: requiresAuth.createResolver(async (parent, { text, tags }, { models, user }) => {
      const where = { };
      if (tags) where.tags = tags;
      const notes = await models.Note.findAll({ where: { [Op.and]: { where, createdBy: user.id } }, raw: true });
      if (text) return search(notes, text, "text");
      return notes;
    })
  },
  Mutation: {
    addNote: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const note = await models.Note.create({ ...args, createdBy: user.id });
        return { ok: true, note };
      } catch (e) { return { ok: false, errors: [e.message] }; }
    }),
    removeNote: requiresAuth.createResolver(async (parent, { id }, { models, user }) => {
      try {
        const note = await models.Note.destroy({ where: { [Op.and]: { id, createdBy: user.id } } });
        return { ok: true, note };
      } catch (e) { return { ok: false, errors: [e.message] }; }
    }),
    updateNote: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const note = await models.Note.update(args, { where: { [Op.and]: { id, createdBy: user.id } } });
        return { ok: true, note };
      } catch (e) { return { ok: false, errors: [e.message] }; }
    })
  }
};