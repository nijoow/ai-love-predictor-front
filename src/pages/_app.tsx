import Container from "@/components/layout/Container";
import "@/styles/globals.css";
import { AppPropsWithLayout } from "@/types/types";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <Container>{getLayout(<Component {...pageProps} />)}</Container>;
}
