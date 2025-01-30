import { NavLink, useParams } from "react-router-dom";
import { useGetUserInfoQuery } from "../services/api";
import { ModeToggle } from "@/common/components/core/mode-toggle";

export default function Navbar() {
  const { userId } = useParams();
  const { data, isSuccess } = useGetUserInfoQuery(userId);

  return (
    <nav className="portfolio-container px-5 md:px-0 py-5 w-full flex items-center justify-between text-grey bg-white dark:bg-black">
      {isSuccess && (
        <>
          <NavLink to={`/portfolio/${data.id}`}>
            <h2 className="hover:text-black dark:hover:text-white text-lg md:text-xl">
              {data.logo ? data.logo : data.email}
            </h2>
          </NavLink>

          <div className="flex items-center gap-5">
            <NavLink
              to={`/portfolio/${data.id}/projects`}
              className="hidden md:inline-block hover:text-black dark:hover:text-white hover:underline duration-500"
            >
              Projects
            </NavLink>
            <ModeToggle />
          </div>
        </>
      )}
    </nav>
  );
}
