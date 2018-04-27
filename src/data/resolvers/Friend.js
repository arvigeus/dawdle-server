import { requiresAuth } from "permissions";

export default {
  Query: {
    friend: requiresAuth.createResolver(async (parent, { id }, { models, user }) =>
      await models.Friend.findOne({ where: { [Op.and]: { [Op.or]: { id, nickname: id }, createdBy: user.id } } })
    ),
    friends: requiresAuth.createResolver(async (parent, args, { models, user }) =>
      await models.Friend.findAll({ where: { createdBy: user.id }, raw: true })
    )
  },
  Mutation: {
    addFriend: requiresAuth.createResolver(async (parent, { name }, { models, user }) => {
      try {
        const friend = await models.Friend.create({ name, createdBy: user.id });
        return { ok: true, friend };
      } catch (e) { return { ok: false, errors: [e.message] }; }
    }),
    removeFriend: requiresAuth.createResolver(async (parent, { id }, { models, user }) => {
      try {
        const friend = await models.Friend.destroy({ where: { [Op.and]: { id, createdBy: user.id } } });
        return { ok: true, friend };
      } catch (e) { return { ok: false, errors: [e.message] }; }
    }),
    updateFriend: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const friend = await models.Friend.update(args, { where: { [Op.and]: { id, createdBy: user.id } } });
        return { ok: true, friend };
      } catch (e) { return { ok: false, errors: [e.message] }; }
    })
  }
};