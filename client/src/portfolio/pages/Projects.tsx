import { useParams } from "react-router-dom";
import ProjectCard from "@/features/projects/components/ProjectCard";
import { useGetProjectsQuery } from "@/portfolio/services/api";
import { Skeleton } from "@/common/components/ui/skeleton";

export default function PortfolioProjectsPage() {
  const { userId } = useParams();
  const { data, isLoading, isSuccess } = useGetProjectsQuery(userId);

  return (
    <main className="portfolio-container px-5 md:px-0 my-10 xl:my-20 w-full text-black dark:text-white bg-white dark:bg-black">
      <h1 className="text-xl xl:text-2xl mb-5">Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {isLoading &&
          [0, 1, 2, 3].map((_, i) => (
            <Skeleton className="w-full h-40" key={i} />
          ))}
        {isSuccess &&
          data.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </div>
    </main>
  );
}
