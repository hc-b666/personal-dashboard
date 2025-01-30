import GoBack from "@/common/components/core/GoBack";
import CreateProjectForm from "@/features/projects/components/CreateProjectForm";

export default function CreateProjectPage() {
  return (
    <div className="col-span-4 my-4 border border-zinc-300 dark:border-zinc-700 rounded-md p-10 flex flex-col items-start gap-5">
      <GoBack />
      <CreateProjectForm />
    </div>
  );
}
