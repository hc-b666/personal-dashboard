import AboutMeEditor from "@/features/about-me/AboutMeEditor";

export default function AboutMePage() {
  return (
    <div className="col-span-4 my-4 border rounded-md p-10 flex flex-col gap-5">
      <h1 className="text-xl font-semibold">About Me</h1>
      <AboutMeEditor />
    </div>
  );
}
