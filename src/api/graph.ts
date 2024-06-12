import { GraphQLClient } from "graphql-request";

const endpoint =
  "https://api.studio.thegraph.com/query/76349/base-sbt/version/latest";
const client = new GraphQLClient(endpoint, { headers: {} });

export default client;
