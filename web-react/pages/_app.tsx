import "../styles/main.scss";
import "../styles/bootstrap-grid.min.css";
import type { AppInitialProps } from "next/app";
import AuthContextProvider from "../context/AuthContext";
import { QueryClientProvider, QueryClient } from "react-query";
import { SessionProvider, signIn } from "next-auth/react";
import { useSession } from "@next-auth/react-query";
import { NextComponentType, NextPageContext } from "next";
import { Router } from "next/router";
import { useEffect } from "react";
import AuthMiddleware from "../middlleware/AuthMiddleware";
import { ProtectedAppProps } from "../types/auth-utils";
import RegisterContextProvider, {
  RegisterContext,
} from "../context/RegisterContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: ProtectedAppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <AuthContextProvider>
          <RegisterContextProvider>
            {Component.auth ? (
              <AuthMiddleware>
                <Component {...pageProps} />
              </AuthMiddleware>
            ) : (
              <Component {...pageProps} />
            )}
          </RegisterContextProvider>
        </AuthContextProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
export default MyApp;
