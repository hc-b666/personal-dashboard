import PublicApisList from "@/features/public-apis/components/PublicApisList";

export default function PublicApisPage() {
  return (
    <div className="col-span-4 my-4 border rounded-md p-10 border-zinc-300 dark:border-zinc-700">
      <h1 className="text-xl font-semibold mb-5">
        Public APIs you can use for your own portfolio
      </h1>
      <PublicApisList />
    </div>
  );
}
