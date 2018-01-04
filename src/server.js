import Koa from "koa";

(async () => {
  try {
    const app = new Koa();

    app.use(async ctx => {
      ctx.body = "Hello World";
    });

    app.listen(process.env.PORT, () =>
      console.info(`Server listening on port ${process.env.PORT}`)
    );
  } catch (err) {
    console.error(err);
  }
})();
