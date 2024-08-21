import "@/styles/globals.css";
import { AppProps } from "next/app";
import { LogProvider } from "@/context/LogContext";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider>
      <LogProvider>
        <Component {...pageProps} />
      </LogProvider>
    </SessionProvider>
  );
}

export default MyApp;
