import "../styles/main.scss";
import "../styles/bootstrap-grid.min.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "../context/AuthContent";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />;
    </AuthContextProvider>
  );
}
export default MyApp;
