import { NavLink } from "react-router-dom";
import { FolderGit, User } from "lucide-react";
import { TbApi } from "react-icons/tb";

const sidebarLinks = [
  {
    name: "Profile",
    to: "/main/profile",
    icon: User,
  },
  {
    name: "Projects",
    to: "/main/projects",
    icon: FolderGit,
  },
  {
    name: "Public Apis",
    to: "/main/public-apis",
    icon: TbApi,
  },
];

export default function Sidebar() {
  return (
    <aside className="col-span-1 my-4 py-5 border rounded-md">
      <div className="px-2 flex flex-col gap-1">
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
      </div>
    </aside>
  );
}
