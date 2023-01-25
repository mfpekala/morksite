import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { createRef, useEffect, useRef, useState } from "react";
import Script from "next/script";
import * as THREE from "three";
import NET from "../components/vanta.min.net";

export default function App({ Component, pageProps }: AppProps) {
  const vantaRef = createRef<HTMLDivElement>();
  const [vantaEffect, setVantaEffect] = useState();

  useEffect(() => {
    setVantaEffect(
      NET({
        el: vantaRef.current,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xc1ffb4,
        backgroundColor: 0x50531,
        points: 13.0,
        maxDistance: 22.0,
        spacing: 12.0,
        THREE: THREE,
      })
    );
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
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
      <div
        ref={vantaRef}
        id="test"
        className="fixed top-0 left-0 z-0 w-screen h-screen"
      />
    </div>
  );
}
