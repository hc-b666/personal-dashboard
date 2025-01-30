import { useParams } from "react-router-dom";
import { useGetUserInfoQuery } from "../services/api";

export const Footer = () => {
  const { userId } = useParams();
  const { data, isSuccess } = useGetUserInfoQuery(userId);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="portfolio-container px-5 md:px-0 py-5 text-black mt-auto dark:text-grey bg-white dark:bg-black">
      <p className="text-xs text-center md:text-left">
        Copyright &copy; {currentYear}, {isSuccess && data.firstName}.&nbsp;All
        rights reserved.
      </p>
    </footer>
  );
};
