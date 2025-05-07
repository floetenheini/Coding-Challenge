'use client'

import { HttpLink } from '@apollo/client'
import {
  ApolloClient,
  InMemoryCache,
  ApolloNextAppProvider,
} from '@apollo/client-integration-nextjs'

function makeClient() {
  const httpLink = new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}` || '',
    },
    fetchOptions: { cache: 'force-cache' },
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}
