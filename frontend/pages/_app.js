import '@/styles/globals.css'
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import ClientOnly from '@/components/ClientOnly';

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ClientOnly>
        <Component {...pageProps} />
      </ClientOnly>
    </ApolloProvider>
  );
}
