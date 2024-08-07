import Head from "next/head";
import { Inter } from "@next/font/google";
import Image from "next/image";
import Headshot from "../public/SmallAcadia.png";
import Slink from "../components/slink";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mark Pekala</title>
        <meta
          name="description"
          content="Hey! I'm Mark, a software engineer with a passion for databases and compression. I make games too."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <div>
          <div>
            <Image
              className="sm:hidden mx-auto mb-8"
              width={200}
              height={200}
              src={Headshot}
              alt="A picture of the author, Mark Pekala"
            />
          </div>
          <div className="flex mb-[1.25em]">
            <div className="flex-1 mr-16">
              <Image
                className="hidden sm:block lg:hidden"
                width={150}
                height={240}
                src={Headshot}
                alt="A picture of the author, Mark Pekala"
              />
              <Image
                className="hidden lg:block"
                width={256}
                height={256}
                src={Headshot}
                alt="A picture of the author, Mark Pekala"
              />
              <p className="mb-[1.25em] pt-4">Hey! I&apos;m Mark.</p>
              <p>
                Originally from{" "}
                <Slink href="https://www.startribune.com/walz-statewide-democrats-sworn-into-office-on-monday/600240181/">
                  Minnesota
                </Slink>
                , I just graduated from Harvard in May 2024 with two degrees in Math and Computer Science.

                While there, I had the opportunity to get my hands dirty doing <Slink href="https://dl.acm.org/doi/10.1145/3639302">database research (SIGMOD 2024)</Slink>,
                writing for and running a <Slink href="https://www.harvardlampoon.com/read/magazines/33/">comedy magazine</Slink>,
                and a bunch of <Slink href="https://github.com/mfpekala?tab=repositories">other stuff</Slink> that&apos;s not in my About page.
              </p>
              <p>
                I&apos;m currently doing a year-long systems engineering fellowship with <Slink href="https://jeffburke.substack.com/p/sutter-hill-ventures-the-silent-builders">Sutter Hill Ventures</Slink>. What does that mean?
                Good question. Right now I&apos;m helping write code at <Slink href="https://www.sigmacomputing.com/">Sigma Computing</Slink> making queries go brrr.
              </p>
              <p>
                At night I make <Slink href="https://mfpekala.itch.io/starling">mid games</Slink>.
              </p>
              <p>
                You can reach me at mfpekala AT gmail DOT com.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
