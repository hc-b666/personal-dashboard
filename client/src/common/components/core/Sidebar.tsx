import { Link, NavLink } from "react-router-dom";
import { sidebarLinks } from "@/common/constants";
import { Button } from "../ui/button";
import useAuth from "@/features/auth/hooks/useAuth";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="col-span-1 my-4 py-5 border rounded-md">
      <div className="h-full px-2 flex flex-col gap-1">
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) =>
              `sidebar-link ${isActive && "bg-zinc-100"}`
            }
          >
            <link.icon className="w-5 h-5" />
            {link.name}
          </NavLink>
        ))}

        <Link to={`/portfolio/${user?.id}`} className="mt-auto">
          <Button className="w-full">View my portfolio</Button>
        </Link>
      </div>
    </aside>
  );
}
