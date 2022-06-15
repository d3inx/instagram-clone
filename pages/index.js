import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";



export default function Home() {
  return (
    <>
      <Head>
        <title>Instagram Clone</title>
        <meta name="description" content="Instagram 2.0" />
        <link rel="icon" href="/favicon-instagram.ico" />
      </Head>
      <Header />
      <Feed />

      <Modal />
    </>
  );
}