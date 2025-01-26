export interface CreateProjectRequest {
  title: string;
  description: string;
  githubLink: string;
  isPublic: boolean;
  projectTypeId: number;
  languages: number[];
}

export interface Project {
  id: number;
  title: string;
  description: string | null;
  githubLink: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  languages: {
    id: number;
    name: string;
    icon: string;
  }[];
  projectType: {
    id: number;
    name: string;
  };
}
