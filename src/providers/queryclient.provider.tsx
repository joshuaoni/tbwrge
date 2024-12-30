import {
  QueryClientProvider as BaseQueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Client } from "@/actions/http-client";
import { joinPaths } from "@/lib/common";

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new Client();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        // This will use the query key as get request path
        queryFn: async function ({ queryKey }) {
          return await client.create({
            method: "GET",
            url: joinPaths(...(queryKey as string[])),
          });
        },
      },
    },
  });
  return (
    <BaseQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </BaseQueryClientProvider>
  );
}
