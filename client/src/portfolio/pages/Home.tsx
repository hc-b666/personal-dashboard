import { useParams } from "react-router-dom";
import { useGetAboutQuery } from "../services/api";
import ReactMarkdownComponent from "@/common/components/core/react-markdown";
import { Skeleton } from "@/common/components/ui/skeleton";

export default function PortfolioHomePage() {
  const { userId } = useParams();
  const { data, isLoading, isSuccess } = useGetAboutQuery(userId);

  return (
    <div className="portfolio-container px-5 md:px-0 my-10 xl:my-20 w-full text-black dark:text-white bg-white dark:bg-black">
      {isLoading && (
        <div className="flex flex-col gap-5">
          <Skeleton className="w-[400px] h-8 mb-10" />
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-32" />
        </div>
      )}
      {isSuccess && <ReactMarkdownComponent text={data.content} />}
    </div>
  );
}
