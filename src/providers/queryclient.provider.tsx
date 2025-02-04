import {
  QueryClientProvider as BaseQueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import toast from "react-hot-toast";

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: (error: any) => {
          if (error.response?.data?.detail) {
            if (Array.isArray(error.response.data.detail)) {
              error.response.data.detail.forEach((err: any) => {
                toast.error(`${err.loc.join(" ")} ${err.msg}`);
              });
            } else {
              toast.error(error.response.data.detail);
            }
          } else {
            toast.error(error.message);
          }
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
