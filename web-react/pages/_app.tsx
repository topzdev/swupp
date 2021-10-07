import "../styles/main.scss";
import "../styles/bootstrap-grid.min.css";
import type { AppInitialProps } from "next/app";
import AuthContextProvider from "../context/AuthContext";
import { QueryClientProvider, QueryClient, Hydrate } from "react-query";
import { SessionProvider, signIn } from "next-auth/react";
import { useSession } from "@next-auth/react-query";
import { NextComponentType, NextPageContext } from "next";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import AuthMiddleware from "../middlleware/AuthMiddleware";
import { ProtectedAppProps } from "../types/auth-utils";
import RegisterContextProvider, {
  RegisterContext,
} from "../context/RegisterContext";
import ProfileContextProvider from "../context/ProfileContext";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: ProtectedAppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <AuthContextProvider>
            <RegisterContextProvider>
              <ProfileContextProvider>
                {Component.auth ? (
                  <AuthMiddleware>
                    <Component {...pageProps} />
                  </AuthMiddleware>
                ) : (
                  <Component {...pageProps} />
                )}
              </ProfileContextProvider>
            </RegisterContextProvider>
          </AuthContextProvider>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
export default MyApp;
