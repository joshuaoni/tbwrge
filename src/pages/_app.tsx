import "@/styles/globals.css";
import type { AppProps } from "next/app";
import DashboardWrapper from "../components/dashboard-wrapper";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Outfit } from "next/font/google"; // Corrected import path
import { GoogleOAuthProvider } from "@react-oauth/google";

const outfit = Outfit({
  subsets: ["latin"], // specify subsets
  weight: ["400", "700", "100", "200", "300", "400", "500", "600"], // specify weights you need
});

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
      >
        <main className={outfit.className}>
          <Component {...pageProps} />
        </main>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
