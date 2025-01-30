import { useFindAllProjectsQuery } from "../services/projectsApi";
import ProjectCard from "./ProjectCard";

export default function ProjectsList() {
  const { data, isSuccess } = useFindAllProjectsQuery({});

  return (
    <div className="mt-5 grid grid-cols-2 gap-5">
      {isSuccess &&
        data.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
    </div>
  );
}
