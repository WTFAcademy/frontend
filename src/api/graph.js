import {gql, GraphQLClient} from "graphql-request";

const endpoint = 'https://api.studio.thegraph.com/query/37543/wtfsbt1155minter/v0.0.1';
const client = new GraphQLClient(endpoint, { headers: {} })


export default client;