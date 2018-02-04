import { GraphQLString, GraphQLNonNull } from "graphql";
import crypto from "crypto-promise";

import GraphQLResponse from "../types/GraphQLResponse";
import { requiresRecaptcha } from "permissions";

export default {
  type: GraphQLResponse,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    "g-recaptcha-response": { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: requiresRecaptcha.createResolver(
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
  )
};
