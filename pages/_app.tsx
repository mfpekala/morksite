import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { createRef, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import NET from "../components/vanta.min.net";
import { usePathname } from "next/navigation";

export default function App({ Component, pageProps }: AppProps) {
  const vantaRef = createRef<HTMLDivElement>();
  const pathname = usePathname();
  const [isBlogPost, setIsBlogPost] = useState(true);

  useEffect(() => {
    const vantaEff = (NET as any)({
      el: vantaRef.current,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xeeeeee,
      backgroundColor: 0x000000,
      points: 20.0,
      maxDistance: 26.0,
      spacing: 16.0,
      THREE: THREE,
    });
    return () => {
      vantaEff.destroy();
    };
  }, []);

  useEffect(() => {
    // For tweaking the page framing on the blog side of site
    setIsBlogPost(!!pathname?.startsWith("/posts"));
  }, [pathname]);

  return (
    <div>
      <div className="relative overscroll-contain z-20">
        <Layout isBlogPost={isBlogPost}>
          <Component {...pageProps} />
        </Layout>
      </div>
      <div
        className={`bg-[rgba(0.1,0.1,0.1,0.3)] fixed top-0 left-0 z-10 w-screen h-screen ${
          isBlogPost ? "hidden" : ""
        }`}
      />
      <div
        ref={vantaRef}
        id="test"
        className={`fixed top-0 left-0 z-0 w-screen h-screen ${
          isBlogPost ? "opacity-0" : ""
        }`}
      />
    </div>
  );
}
