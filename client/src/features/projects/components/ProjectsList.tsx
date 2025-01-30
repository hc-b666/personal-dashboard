import { Skeleton } from "@/common/components/ui/skeleton";
import { useFindAllProjectsQuery } from "../services/projectsApi";
import ProjectCard from "./ProjectCard";

export default function ProjectsList() {
  const { data, isLoading, isSuccess } = useFindAllProjectsQuery({});

  return (
    <div className="mt-5 grid grid-cols-2 gap-5">
      {isLoading &&
        [0, 1, 2, 3].map((_, i) => (
          <Skeleton className="w-full h-40" key={i} />
        ))}
      {isSuccess &&
        data.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
    </div>
  );
}
