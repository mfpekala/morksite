import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="dark text-slate-100 overscroll-contain">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
