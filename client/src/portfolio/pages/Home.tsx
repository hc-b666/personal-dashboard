import { useParams } from "react-router-dom";
import { useGetAboutQuery } from "../services/api";
import ReactMarkdownComponent from "@/common/components/core/react-markdown";

export default function PortfolioHomePage() {
  const { userId } = useParams();
  const { data, isSuccess } = useGetAboutQuery(userId);

  return (
    <div className="portfolio-container px-5 md:px-0 my-10 xl:my-20 w-full text-black dark:text-white bg-white dark:bg-black">
      {isSuccess && <ReactMarkdownComponent text={data.content} />}
    </div>
  );
}
