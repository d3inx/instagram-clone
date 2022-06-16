import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import Header from "../components/Header";
import MobileNavBar from "../components/MobileNavBar";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  console.log(MobileNavBar.size);
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Header />
        <Component {...pageProps} />
        <MobileNavBar />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
