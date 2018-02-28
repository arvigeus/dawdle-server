import "@babel/polyfill";
import { createServer } from "http";
import Koa from "koa";
import koaBody from "koa-bodyparser";
import cors from "@koa/cors";

import router from "./routes";
import getModels from "./data/models";

(async () => {
  try {
    const app = new Koa();

    app.context.models = await getModels();

    if (process.env.NODE_ENV !== "production")
      app.use(require("middleware/responseTime").default);

    app.use(cors("*"));

    app.use(koaBody());

    app.use(router.routes());
    app.use(router.allowedMethods());

    app.use(async ctx => {
      ctx.body = "Hello World";
    });

    const server = createServer(app.callback());

    server.listen(process.env.PORT, () =>
      console.info(`Server listening on port ${process.env.PORT}`)
    );
  } catch (err) {
    console.error(err);
  }
})();
