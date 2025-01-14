import { getLanguages, getProjectTypes } from "@/actions/projects.action";
import CreateProjectForm from "@/components/CreateProjectForm";

export default async function DashboardPage() {
  const [projectTypes, languages] = await Promise.all([
    getProjectTypes(),
    getLanguages(),
  ]);

  return (
    <div className="mx-auto py-5 w-[600px] flex flex-col gap-5">
      <h1 className="text-2xl font-semibold">
        Add your project to your portfolio
      </h1>
      <CreateProjectForm projectTypes={projectTypes} languages={languages} />
    </div>
  );
}
