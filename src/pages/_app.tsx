import "@/styles/globals.css";
import type { AppProps } from "next/app";
import DashboardWrapper from "../components/dashboard-wrapper";
import { Outfit } from "next/font/google"; // Corrected import path

const outfit = Outfit({
  subsets: ["latin"], // specify subsets
  weight: ["400", "700", "100", "200", "300", "400", "500", "600"], // specify weights you need
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={outfit.className}>
      <DashboardWrapper>
        <Component {...pageProps} />
      </DashboardWrapper>
    </main>
  );
}
