"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  type CreateProjectDto,
  createProjectSchema,
} from "@/schemas/create-project.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "./ui/badge";
import { createProject } from "@/actions/projects.action";
import { toast } from "@/hooks/use-toast";

interface CreateProjectFormProps {
  projectTypes: {
    success: boolean;
    projectTypes?: {
      id: string;
      name: string;
    }[];
  };
  languages: {
    success: boolean;
    languages?: {
      id: string;
      name: string;
      icon: string;
    }[];
  };
}
export default function CreateProjectForm({
  projectTypes,
  languages,
}: CreateProjectFormProps) {
  const [selectedLangs, setSelectedLangs] = useState<
    { id: string; name: string }[]
  >([]);

  const form = useForm<CreateProjectDto>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      date: undefined,
      githubLink: "",
      isPublic: false,
      type: undefined,
      languages: [],
    },
  });

  async function onSubmit(values: CreateProjectDto) {
    try {
      const res = await createProject(values);
      console.log(res);
      if (!res.success) {
        if (res.error) {
          console.log("Zod error", res.error);
          const firstErr = res.error[0];
          toast({ variant: "destructive", description: firstErr.message });
          return;
        }

        toast({ variant: "destructive", description: res.message as string });
        return;
      }

      toast({ description: res.message as string });
    } catch (err) {
      console.error("Error in onSubmit() Action:", {
        message: err instanceof Error ? err.message : "Unknown error",
        err,
      });

      toast({ description: "Something went wrong" });
    }
  }

  function handleLanguageSelect(languageId: string) {
    const selectedLang = languages.languages?.find(
      (lang) => lang.id === languageId
    );
    if (!selectedLang) return;

    if (!selectedLangs.some((lang) => lang.id === languageId)) {
      const newSelected = [
        ...selectedLangs,
        { id: languageId, name: selectedLang.name },
      ];
      setSelectedLangs(newSelected);
      form.setValue(
        "languages",
        newSelected.map((lang) => lang.id)
      );
    }
  }

  function removeLanguage(languageId: string) {
    const newSelected = selectedLangs.filter((lang) => lang.id !== languageId);
    setSelectedLangs(newSelected);
    form.setValue(
      "languages",
      newSelected.map((lang) => lang.id)
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Desrciption</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="githubLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Github Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://github.com/username/repo"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.projectTypes &&
                      projectTypes.projectTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="languages"
          render={() => (
            <FormItem>
              <FormLabel>Languages or frameworks used in the project</FormLabel>
              <div className="flex flex-col gap-2">
                <FormControl>
                  <Select onValueChange={handleLanguageSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select languages" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.languages?.map((lang) => (
                        <SelectItem key={lang.id} value={lang.id}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <div className="flex flex-wrap gap-2">
                  {selectedLangs.map((lang) => (
                    <Badge
                      key={lang.id}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {lang.name}
                      <button
                        type="button"
                        onClick={() => removeLanguage(lang.id)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Make project public</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Project</Button>
      </form>
    </Form>
  );
}
