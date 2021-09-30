import { NextComponentType, NextPageContext } from "next";
import { AppProps } from "next/app";

export type AuthEnabledComponentConfig = {
  auth: boolean;
};

export type ComponentWithAuth<PropsType = any> = React.FC<PropsType> &
  AuthEnabledComponentConfig;

export type ProtectedAppProps = AppProps & { Component: ComponentWithAuth };
