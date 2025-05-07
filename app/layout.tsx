import type { Metadata } from 'next'
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry'
import GlobalStyles from '@/styles/GlobalStyles'
import { ApolloWrapper } from '@/lib/ApolloClientProvider'

export const metadata: Metadata = {
  title: 'Trainee Coding Challenge',
  description: 'MediaMarktSaturn',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <StyledComponentsRegistry>
      <GlobalStyles />
      <ApolloWrapper>
        <html lang="en">
          <body>{children}</body>
        </html>
      </ApolloWrapper>
    </StyledComponentsRegistry>
  )
}
