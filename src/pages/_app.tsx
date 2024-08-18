// pages/_app.tsx
import "@/styles/globals.css";
// pages/_app.tsx
import { AppProps } from "next/app";
import { LogProvider } from "@/context/LogContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LogProvider>
      <Component {...pageProps} />
    </LogProvider>
  );
}

export default MyApp;
