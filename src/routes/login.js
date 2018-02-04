import { createTokens } from "../tokens";

import bcrypt from "bcrypt";

export default async ctx => {
  const { params: { id, token }, models } = ctx;

  const device = models.Device.findOne({
    include: [
      {
        model: models.User,
        as: "Owner"
      }
    ],
    where: { id },
    raw: true
  });

  if (device && (await bcrypt.compare(token, device.token))) {
    const refreshSecret = device.Owner.id + process.env.JWT_SECRET2;

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
