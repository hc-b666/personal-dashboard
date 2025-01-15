import { getProjects } from "@/actions/projects.action";
import ProjectCard from "@/components/ProjectCard";

export default async function ProjectsPage() {
  const projectsResult = await getProjects();
  if (!projectsResult.success) {
    return <div>Could not fetch projects</div>;
  }

  return (
    <div className="container py-5">
      <h1 className="text-xl font-semibold mb-5">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projectsResult.projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
