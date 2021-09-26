import "../styles/main.scss";
import "../styles/bootstrap-grid.min.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "../context/AuthContext";
import { QueryClientProvider, QueryClient } from "react-query";
import axios from "axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Component {...pageProps} />;
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
export default MyApp;
