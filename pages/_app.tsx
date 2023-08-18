import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { createRef, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import NET from "../components/vanta.min.net";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import Typewriter from "typewriter-effect";

export default function App({ Component, pageProps }: AppProps) {
  const vantaRef = createRef<HTMLDivElement>();
  const pathname = usePathname();
  const [isBlogPost, setIsBlogPost] = useState(false);
  const [typewriterOpacity, setTypewriterOpacity] = useState(100);

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
    setTimeout(() => {
      setTypewriterOpacity(0);
    }, 1800);
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
      {!isBlogPost && (
        <div
          className={`transition-opacity ease-in duration-700 opacity-${typewriterOpacity} pointer-events-none fixed top-0 w-full h-full bg-slate-50 z-30 flex justify-center items-center`}
        >
          <div
            className={`transition ease-in duration-1000 scale-${typewriterOpacity}`}
          >
            <Typewriter
              options={{
                strings: ["Mark Faist Pekala"],
                autoStart: true,
                loop: false,
                delay: 50,
                cursorClassName:
                  "text-5xl font-bold animate-ping text-gray-900",
                wrapperClassName: "text-center text-5xl text-gray-900",
              }}
            />
          </div>
        </div>
      )}
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
      <Analytics />
    </div>
  );
}
