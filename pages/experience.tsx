import Head from "next/head";
import ExpItem from "../components/exp_item";
import { Experiences } from "../data/experiences";

export default function ExperiencePage() {
  const spotifyUrl =
    "https://accounts.spotify.com/authorize?client_id=8f81405b8d764a89849403cf4f30c625&response_type=code&redirect_uri=http://localhost:3000/test&scope=user-read-recently-played";

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
        <a href={spotifyUrl}>Authorize</a>
        {Experiences.map((exp, ix) => (
          <ExpItem key={exp.org + exp.title} {...exp} />
        ))}
      </div>
    </>
  );
}
