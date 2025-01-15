import Link from "next/link";
import { Project, Language, ProjectType } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import { icons } from "@/constants/icons";

interface Props {
  project: Project & {
    languages: Language[];
    type: ProjectType;
  };
}

export default function ProjectCard({ project }: Props) {
  return (
    <Link href={"/"} className="project-card">
      <div className="mb-1 flex justify-between">
        <h3 className="text-md">{project.title}</h3>
        <p className="text-grey text-xs">{formatDate(project.date)}</p>
      </div>

      <p className="text-xs text-grey mb-3">{project.description}</p>

      <div className="mt-auto flex flex-wrap items-center gap-2">
        {project.languages.map((language) => {
          const Icon = icons[language.icon];

          return (
            <div key={language.id} className="flex items-center gap-1">
              {Icon && <Icon />}
              <span className="text-xs text-grey">{language.name}</span>
            </div>
          );
        })}
      </div>
    </Link>
  );
}
