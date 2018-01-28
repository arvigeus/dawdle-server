import { createServer } from "http";
import Koa from "koa";
import koaRouter from "koa-router";
import koaBody from "koa-bodyparser";
import cors from "@koa/cors";
import { graphqlKoa, graphiqlKoa } from "apollo-server-koa";

import schema from "./data/schema";

(async () => {
  try {
    const app = new Koa();
    const router = new koaRouter();

    app.use(cors("*"));

    // koaBody is needed just for POST.
    app.use(koaBody());

    router.post("/graphql", graphqlKoa({ schema }));
    router.get("/graphql", graphqlKoa({ schema }));

    router.get(
      "/graphiql",
      graphiqlKoa({
        endpointURL: "/graphql"
        // passHeader: `'Authorization': 'Bearer lorem ipsum'`,
      })
    );

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
