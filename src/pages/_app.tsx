import QueryClientProvider from "@/providers/queryclient.provider";
import "@/styles/globals.css";
import "react-quill/dist/quill.snow.css";
import "@/styles/quillOverrides.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google"; // Corrected import path
import { Toaster } from "react-hot-toast";
import "@/lib/i18n"; // Initialize i18n

const outfit = Inter({
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
        <Toaster />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
