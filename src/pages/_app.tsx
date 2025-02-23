import QueryClientProvider from "@/providers/queryclient.provider";
import "@/styles/globals.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google"; // Corrected import path
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"], // specify subsets
  weight: ["400", "700", "100", "200", "300", "400", "500", "600"], // specify weights you need
});
console.log(inter);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
        </LocalizationProvider>
        <Toaster />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
