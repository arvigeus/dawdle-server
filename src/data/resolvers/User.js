import { requiresRecaptcha, requiresAuth } from "permissions";

export default {
  Query: {
    me: requiresAuth.createResolver((parent, args, { models, user }) =>
      models.User.findOne({ where: { id: user.id } })
    )
  },
  Mutation: {
    login: requiresRecaptcha.createResolver(
      async (parent, { email }, { models }) => {
        try {
          const user = await models.User.findOrCreate({ where: { email } });
  
          const token = (await crypto.randomBytes(22)).toString("hex");
          const device = await models.Device.create({ token });
          await user.addDevice(device);
  
          // TODO: Send login email
          // sendEmail({ id: device.id, token })
  
          return { ok: true };
        } catch (e) {
          return {
            ok: false,
            errors: [e.message]
          };
        }
      }
    ),

    logout: requiresAuth.createResolver(
      async (parent, args, { user, device }) => {
        try {
          await user.setDevices([]);
  
          return { ok: true };
        } catch (e) {
          return {
            ok: false,
            errors: [e.message]
          };
        }
      }
    )
  }
};