import { graphiqlKoa } from "apollo-server-koa";

import schema from "data/schema";

export default graphiqlKoa({
  endpointURL: "/graphql"
  // passHeader: `'Authorization': 'Bearer lorem ipsum'`,
});
