import { BookOpen, FolderGit, User } from "lucide-react";
import { TbApi } from "react-icons/tb";

export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const sidebarLinks = [
  {
    name: "Profile",
    to: "/main/profile",
    icon: User,
  },
  {
    name: "About me",
    to: "/main/about-me",
    icon: BookOpen,
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

export const publicApis = [
  {
    label:
      "Your about content [Recommended to use React-markdown for this content with your own customization]",
    id: "about",
    url: `${BACKEND_BASE_URL}/api/about`,
  },
  {
    label: "Your public projects API",
    id: "projects-api",
    url: `${BACKEND_BASE_URL}/api/projects`,
  },
];
