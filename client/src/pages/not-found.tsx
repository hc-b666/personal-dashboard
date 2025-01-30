import { useEffect } from "react";
import GoBack from "@/common/components/core/GoBack";

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "Portfolio Dashboard | 404";
  }, []);

  return (
    <div className="container flex-grow flex flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-5">
        <span className="text-3xl py-3 px-5 dark:border-zinc-600 border-r">
          404
        </span>
        <span>This page could not be found.</span>
      </div>

      <GoBack />
    </div>
  );
}
