import { Link } from "react-router-dom";
import { Project } from "../types";
import { formatDate } from "@/common/lib/utils";
import icons from "@/common/icons";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <Link to={`${project.githubLink}`} className="project-wrap">
      <div className="mb-1 flex justify-between">
        <h3 className="text-md">{project.title}</h3>
        <p className="text-grey text-xs">{formatDate(project.createdAt)}</p>
      </div>

      <p className="text-xs text-grey mb-3">{project.description}</p>

      <div className="mt-auto flex flex-wrap items-center gap-2">
        {project.languages.map((lang) => {
          const IconComponent = icons[lang.icon as keyof typeof icons];

          return (
            <div key={lang.id} className="flex items-center gap-1">
              <IconComponent className="text-xl" />
              <span className="text-xs text-grey">{lang.name}</span>
            </div>
          );
        })}
      </div>
    </Link>
  );
}
