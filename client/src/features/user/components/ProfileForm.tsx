import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import useAuth from "@/features/auth/hooks/useAuth";
import { useFindUserQuery, useUpdateInfoMutation } from "../services/userApi";
import { toast } from "@/common/hooks/use-toast";

interface ProfileFormBody {
  firstname: string;
  lastname: string;
}

export default function ProfileForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, isSuccess, refetch } = useFindUserQuery({});
  const [updateInfo] = useUpdateInfoMutation();

  const { register, handleSubmit, reset } = useForm<ProfileFormBody>({
    defaultValues: useMemo(
      () => ({
        firstname: isSuccess ? data.firstName : "",
        lastname: isSuccess ? data.lastName : "",
      }),
      [data]
    ),
  });

  const onSubmit: SubmitHandler<ProfileFormBody> = async (data) => {
    if (!user) return;

    try {
      const res = await updateInfo(data).unwrap();
      toast({ description: res.message });
      refetch();
    } catch (err) {
      console.log(err);
      toast({ variant: "destructive", description: "Something went wrong" });
    }
  };

  const handleCancel = () => {
    reset();
  };

  if (!user) {
    navigate("/auth/login");
    return;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col items-start"
    >
      <div className="w-full flex items-center gap-5">
        <div className="flex-1 flex flex-col gap-2">
          <Label htmlFor="firstname">Firstname</Label>
          <Input
            id="firstname"
            type="text"
            placeholder="John"
            {...register("firstname")}
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <Label htmlFor="lastname">Lastname</Label>
          <Input
            id="lastname"
            type="text"
            placeholder="Smith"
            {...register("lastname")}
          />
        </div>
      </div>

      <div className="mt-auto self-end flex items-center gap-3">
        <Button type="submit">Save</Button>
        <Button variant="secondary" type="button" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
