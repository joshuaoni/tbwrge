import QueryClientProvider from "@/providers/queryclient.provider";
import "@/styles/globals.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";
import { Outfit } from "next/font/google"; // Corrected import path

const outfit = Outfit({
  subsets: ["latin"], // specify subsets
  weight: ["400", "700", "100", "200", "300", "400", "500", "600"], // specify weights you need
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <main className={outfit.className}>
            <Component {...pageProps} />
          </main>
        </LocalizationProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
