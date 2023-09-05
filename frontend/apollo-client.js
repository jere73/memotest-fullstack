import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://0.0.0.0:8085/graphql",
    cache: new InMemoryCache(),
});

export default client;