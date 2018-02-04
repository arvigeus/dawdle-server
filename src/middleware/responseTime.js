export default async (ctx, next) => {
  const started = Date.now();
  await next();
  // once all middleware below completes, this continues
  ctx.set("X-ResponseTime", Date.now() - started + "ms");
};
