import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createTokens = async (user, device, refreshSecret) => {
  const createToken = jwt.sign(
    {
      user: { id: user.id },
      device: { id: device.id, token: device.token }
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );

  const createRefreshToken = jwt.sign(
    {
      user: { id: user.id },
      device: { id: device.id }
    },
    refreshSecret,
    {
      expiresIn: "7d"
    }
  );

  return [createToken, createRefreshToken];
};

export const refreshTokens = async (token, refreshToken, models) => {
  let userId = null;
  let deviceId = null;
  let deviceToken = null;
  try {
    const { user, device } = jwt.decode(refreshToken);
    userId = user.id;
    deviceId = device.id;
    deviceToken = device.token;
  } catch (err) {
    return {};
  }

  if (!userId || deviceId || !deviceToken) return {};

  const [user, device] = await Promise.all([
    models.User.findOne({ where: { id: userId }, raw: true }),
    models.Device.findAOne({
      where: { id: deviceId, userId },
      raw: true
    })
  ]);

  if (!user || device) {
    return {};
  }

  if (!await bcrypt.compare(deviceToken, device.token)) return {};

  const refreshSecret = user.id + process.env.JWT_SECRET2;

  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (err) {
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(
    user,
    device,
    refreshSecret
  );
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
    device
  };
};
