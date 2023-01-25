import Head from "next/head";
import ProjItem from "../components/proj_item";
import { PROJECTS } from "../data/projects";

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Mark Pekala - Projects</title>
        <meta
          name="description"
          content="Technically this website counts too."
        />
      </Head>
      {PROJECTS.map((project) => {
        return <ProjItem key={project.title} {...project} />;
      })}
    </>
  );
}
