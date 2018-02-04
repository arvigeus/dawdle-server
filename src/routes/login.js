import { createTokens } from "../tokens";

import bcrypt from "bcrypt";

export default async ctx => {
  const { params: { id, token }, models } = ctx;

  const device = models.Device.findOne({ where: { id }, raw: true });

  if (device && (await bcrypt.compare(token, device.token))) {
    const refreshSecret = token + process.env.JWT_SECRET2;

    const [newToken, newRefreshToken] = await createTokens(
      device.Owner,
      device,
      refreshSecret
    );
    ctx.set({
      "Access-Control-Expose-Headers": "x-token, x-refresh-token",
      "x-token": newToken,
      "x-refresh-token": newRefreshToken
    });
  }

  ctx.redirect("/");
};
