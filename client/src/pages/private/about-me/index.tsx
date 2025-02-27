import AboutMeEditor from "@/features/about-me/components/AboutMeEditor";
import { useFindByUserIdQuery } from "@/features/about-me/services/aboutApi";
import useAuth from "@/features/auth/hooks/useAuth";

export default function AboutMePage() {
  const { user } = useAuth();
  const { data, isSuccess } = useFindByUserIdQuery(user?.id as number, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="col-span-4 my-4 border rounded-md p-10 flex flex-col gap-5 border-zinc-300 dark:border-zinc-700">
      <h1 className="text-xl font-semibold">About Me</h1>
      {isSuccess && <AboutMeEditor about={data} />}
    </div>
  );
}
