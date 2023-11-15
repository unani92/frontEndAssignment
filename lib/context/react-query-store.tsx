import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export default function ReactQueryProvider({
  children,
}: {
  children?: React.ReactNode
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: false, refetchOnWindowFocus: false },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
