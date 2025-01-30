import { Link } from "react-router-dom";
import { Button } from "@/common/components/ui/button";
import ProjectsList from "@/features/projects/components/ProjectsList";

export default function ProjectsPage() {
  return (
    <div className="col-span-4 my-4 border rounded-md p-10 bg-white dark:bg-black border-zinc-300 dark:border-zinc-700">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Your projects</h1>
        <Link to="/main/projects/create">
          <Button>Create Project</Button>
        </Link>
      </div>
      <ProjectsList />
    </div>
  );
}
