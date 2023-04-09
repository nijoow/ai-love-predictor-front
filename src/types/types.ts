import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export type Message = {
  role: 'USER' | 'AI';
  profile?: boolean;
  content: string;
  delay: number;
  time: string;
};
