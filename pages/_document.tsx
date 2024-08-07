import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/mountain.ico" />
        <link rel="apple-touch-icon" href="flysingle.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&display=optional"
          rel="stylesheet"
        />
      </Head>
      <body className="dark text-slate-100 overscroll-contain">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
