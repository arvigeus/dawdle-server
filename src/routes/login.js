import { createTokens } from "../tokens";

import bcrypt from "bcrypt";

export default async ctx => {
  const { params: { id, token }, models } = ctx;

  const device = models.Device.findOne({ where: { id }, raw: true });

  if (device && (await bcrypt.compare(token, device.token))) {
    const refreshSecret = token + process.env.JWT_SECRET2;
    const owner = device.Owner;

    if (!owner.confirmedAt) {
      await owner.updateAttributes({ confirmedAt: Date.now() });
      const friends = await models.Friend.findAll({
        where: { email: owner.email }
      });
      for (const { CreatedBy: { email } } of friends) {
        // TODO: Send notification to friends that user has joined
      }
    }

    const [newToken, newRefreshToken] = await createTokens(
      owner,
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
