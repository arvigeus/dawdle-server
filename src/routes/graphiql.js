import { graphqlKoa } from "apollo-server-koa";

import schema from "data/schema";

export default graphqlKoa({ schema });
