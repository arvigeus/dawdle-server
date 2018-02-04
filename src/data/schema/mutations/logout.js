import { GraphQLBoolean } from "graphql";

import GraphQLResponse from "../types/GraphQLResponse";
import { requiresAuth } from "permissions";

export default {
  type: GraphQLResponse,
  args: {
    allDevices: { type: GraphQLBoolean }
  },
  resolve: requiresAuth.createResolver(
    async (parent, { allDevices }, { user, device }) => {
      try {
        if (!allDevices) user.removeDevice(device);
        else await user.setDevices([]);

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
