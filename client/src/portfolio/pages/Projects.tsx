import { useParams } from "react-router-dom";
import ProjectCard from "@/features/projects/components/ProjectCard";
import { useGetProjectsQuery } from "@/portfolio/services/api";

export default function PortfolioProjectsPage() {
  const { userId } = useParams();
  const { data, isSuccess } = useGetProjectsQuery(userId);

  return (
    <main className="portfolio-container px-5 md:px-0 my-10 xl:my-20 w-full text-black dark:text-white bg-white dark:bg-black">
      <h1 className="text-xl xl:text-2xl mb-5">Projects</h1>
      {isSuccess && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </main>
  );
}
