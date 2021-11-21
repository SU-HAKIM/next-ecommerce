import Link from "next/link";
import Head from "next/head";
import Script from "next/script";

import type { NextPage } from "next";
import Navbar from "./Navbar";

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js" />
    </>
  );
};

export default Layout;
