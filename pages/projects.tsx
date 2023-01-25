import ProjItem from "../components/proj_item";
import { PROJECTS } from "../data/projects";

export default function ProjectsPage() {
  return PROJECTS.map((project) => {
    return <ProjItem key={project.title} {...project} />;
  });
}
