import "@/styles/globals.css";
import type { AppProps } from "next/app";
import DashboardWrapper from "../components/dashboard-wrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DashboardWrapper>
      <Component {...pageProps} />
    </DashboardWrapper>
  );
}
