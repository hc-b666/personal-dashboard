import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Textarea } from "@/common/components/ui/textarea";
import { Button } from "@/common/components/ui/button";
import MultiSelect from "@/common/components/core/MultiSelect";
import { Switch } from "@/common/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";
import { CreateProjectRequest } from "../types";
import { useFindAllLanguagesQuery } from "@/features/languages/services/languagesApi";
import { useFindAllProjectTypesQuery } from "@/features/projectType/services/projectTypeApi";
import { toast } from "@/common/hooks/use-toast";
import { useCreateProjectMutation } from "../services/projectsApi";

export default function CreateProjectForm() {
  const { data: langs, isSuccess: successLang } = useFindAllLanguagesQuery({});
  const { data: types, isSuccess: successType } = useFindAllProjectTypesQuery(
    {}
  );
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const { register, handleSubmit, control } = useForm<CreateProjectRequest>({
    defaultValues: {
      isPublic: true,
      languages: [],
    },
  });

  const onSubmit: SubmitHandler<CreateProjectRequest> = async (data) => {
    try {
      const res = await createProject(data).unwrap();
      toast({ description: res.message });
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        description: (err as { data: { message: string } }).data.message,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col items-start gap-4"
    >
      <div className="w-full flex items-center gap-5">
        <div className="flex-1 flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Title"
            {...register("title")}
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <Label htmlFor="project-link">Project Link</Label>
          <Input
            id="project-link"
            type="text"
            placeholder="https://github.com/hc-b666/personal-dashboard"
            {...register("githubLink")}
          />
        </div>
      </div>

      <div className="w-[600px] flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Description"
          className="h-[160px]"
          {...register("description")}
        />
      </div>

      <div className="w-[600px] flex flex-col gap-2">
        <Label>Programming Languages</Label>
        <Controller
          name="languages"
          control={control}
          render={({ field }) => (
            <MultiSelect
              options={successLang ? langs : []}
              getLabel={(lang) => lang.name}
              getValue={(lang) => lang.id}
              onSelectedChange={(selectedIds) => {
                field.onChange(selectedIds);
              }}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="is-public">Is public?</Label>
        <Controller
          name="isPublic"
          control={control}
          render={({ field }) => (
            <Switch
              id="is-public"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked)}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Project type</Label>
        <Controller
          name="projectTypeId"
          control={control}
          render={({ field }) => (
            <Select onValueChange={(val) => field.onChange(Number(val))}>
              <SelectTrigger id="projectTypeId" className="w-[180px]">
                <SelectValue placeholder="Project Type" />
              </SelectTrigger>
              <SelectContent>
                {successType && (
                  <>
                    {types.map((type) => (
                      <SelectItem key={type.id} value={type.id.toString()}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="mt-auto self-end">
        {isLoading ? "Creating" : "Create"}
      </Button>
    </form>
  );
}
