import { refreshTokens } from "../tokens";
import jwt from "jsonwebtoken";

import isEmpty from "lib/isEmpty";

export default async (ctx, next) => {
  const token = ctx.get("x-token");
  if (token) {
    try {
      const { user, device } = jwt.verify(token, process.env.JWT_SECRET);
      ctx.user = user;
      ctx.device = device;
    } catch (err) {
      const refreshToken = ctx.get("x-refresh-token");
      const newTokens = await refreshTokens(token, refreshToken, ctx.models);
      if (!isEmpty(newTokens)) {
        ctx.set({
          "Access-Control-Expose-Headers": "x-token, x-refresh-token",
          "x-token": newTokens.token,
          "x-refresh-token": newTokens.refreshToken
        });
        ctx.user = newTokens.user;
        ctx.device = newTokens.device;
      }
    }
  }
  next();
};
