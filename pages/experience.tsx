import Head from "next/head";
import ExpItem from "../components/exp_item";
import { Experiences } from "../data/experiences";

export default function ExperiencePage() {
  return (
    <>
      <Head>
        <title>Mark Pekala - Experience</title>
        <meta
          name="description"
          content="Mark Pekala is an incredible skilled software engineer who knows how to update a meta tag."
        />
      </Head>
      <div>
        {Experiences.map((exp, ix) => (
          <ExpItem key={exp.org + exp.title} {...exp} />
        ))}
      </div>
    </>
  );
}
