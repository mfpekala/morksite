import Head from "next/head";
import { Inter } from "@next/font/google";
import Image from "next/image";
import PixelHeadshot from "../public/MePixels.png";
import Slink from "../components/slink";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Mark Pekala</title>
        <meta
          name="description"
          content="Hey! I'm Mark, a software engineer with a passion for databases, compression, and full-stack development. I spend my free time writing comedy and making games."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <p></p>
        </div>
        <div>
          <div>
            <Image
              className="sm:hidden mx-auto mb-8"
              width={200}
              height={200}
              src={PixelHeadshot}
              alt="A picture of the author, Mark Pekala"
            />
          </div>
          <div className="flex mb-[1.25em]">
            <div className="flex-1 mr-16">
              <p className="mb-[1.25em]">Hey! I&apos;m Mark.</p>
              <p>
                Originally from{" "}
                <Slink href="https://www.startribune.com/walz-statewide-democrats-sworn-into-office-on-monday/600240181/">
                  Minnesota
                </Slink>
                , I&apos;m currently at Harvard pursuing two degrees in Math and
                Computer Science set to graduate in 2024. I study the
                structures, algorithms, and systems that make{" "}
                <span className="text-xl">BIG</span> data tangible. I&apos;m
                also interested in compression and the limits of computing, and
                can crank out ML models if I need to.
              </p>
            </div>
            <div>
              <Image
                className="hidden sm:block lg:hidden"
                width={150}
                height={240}
                src={PixelHeadshot}
                alt="A picture of the author, Mark Pekala"
              />
              <Image
                className="hidden lg:block"
                width={124}
                height={198}
                src={PixelHeadshot}
                alt="A picture of the author, Mark Pekala"
              />
            </div>
          </div>
          <div className="flex mb-[1.25em]">
            <p>
              In my free time I write comedy, run, and make{" "}
              <Slink href="">games</Slink>.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
