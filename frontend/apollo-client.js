import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BASE_URL_API,
    cache: new InMemoryCache(),
});

export default client;