import koaRouter from "koa-router";

import graphql from "./graphql";
import graphiql from "./graphiql";
import login from "./login";

const router = new koaRouter();

router
  .post("/graphql", graphql)
  .get("/graphql", graphql)
  .get("/graphiql", graphiql)
  .get("/login/:id/:token", login);

export default router;
