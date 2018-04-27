import { requiresAuth } from "permissions";
import search from "lib/fuzzySearch";

export default {
  Query: {
    todos: requiresAuth.createResolver(async (parent, { text, tags, endDate, isCompleted }, { models, user }) => {
      const where = { };
      if (tags) where.tags = tags;
      if (isCompleted) where.isCompleted = true;
      if (endDate) where.endDate = { [Op.gt]: endDate };
      const todos = await models.Todo.findAll({ where: { [Op.and]: { where, createdBy: user.id } }, raw: true });
      if (text) return search(todos, text, "text");
      return todos;
    })
  },
  Mutation: {
    addTodo: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const todo = await models.Todo.create({ ...args, createdBy: user.id });
        return { ok: true, todo };
      } catch (e) { return { ok: false, errors: [e.message] }; }
    }),
    removeTodo: requiresAuth.createResolver(async (parent, { id }, { models, user }) => {
      try {
        const todo = await models.Todo.destroy({ where: { [Op.and]: { id, createdBy: user.id } } });
        return { ok: true, todo };
      } catch (e) { return { ok: false, errors: [e.message] }; }
    }),
    updateTodo: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const todo = await models.Todo.update(args, { where: { [Op.and]: { id, createdBy: user.id } } });
        return { ok: true, todo };
      } catch (e) { return { ok: false, errors: [e.message] }; }
    })
  }
};