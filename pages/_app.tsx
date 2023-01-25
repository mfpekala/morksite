import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const head = document.querySelector("head");
    const script1 = document.createElement("script");
    const script2 = document.createElement("script");
    const script3 = document.createElement("script");

    if (!head || !script1 || !script2 || !script3) return;

    script1.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
    );
    script2.setAttribute(
      "src",
      "https://cdn.jsdelivr.net/npm/vanta/dist/vanta.net.min.js"
    );
    script3.text = `
        VANTA.NET({
          el: "#test",
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0xc1ffb4,
          backgroundColor: 0x50531,
          points: 13.00,
          maxDistance: 22.00,
          spacing: 12.00
        })
      `;
    head.appendChild(script1);
    head.appendChild(script2);
    script2.addEventListener("load", () => {
      head.appendChild(script3);
    });

    return () => {
      head.removeChild(script1);
      head.removeChild(script2);
    };
  }, []);

  return (
    <div>
      <div className="relative overscroll-contain z-20">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
      <div className="bg-[rgba(0,0,0,0.76)] fixed top-0 left-0 z-10 w-screen h-screen" />
      <div id="test" className="fixed top-0 left-0 z-0 w-screen h-screen" />
    </div>
  );
}
