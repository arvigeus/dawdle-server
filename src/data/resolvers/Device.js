import { requiresAuth } from "permissions";

export default {
  Query: {
    devices: requiresAuth.createResolver(async (parent, args, { models, user }) =>
    await models.Device.findAll({ where: { createdBy: user.id }, raw: true })
    )
  },
  Mutation: {
    removeDevice: requiresAuth.createResolver(async (parent, { id }, { models, device }) => {
      try {
        const result = await models.device.destroy({ where: { [Op.and]: {  id: id || device.id, createdBy: user.id } } });
        return { ok: true, device: result };
      } catch (e) { return { ok: false, errors: [e.message] }; }
    }),
    updateDevice: requiresAuth.createResolver(async (parent, { id, name }, { models, user }) => {
      try {
        const device = await models.Devices.update({ name }, { where: { [Op.and]: { id, createdBy: user.id } } });
        return { ok: true, device };
      } catch (e) { return { ok: false, errors: [e.message] }; }
    })
  }
};