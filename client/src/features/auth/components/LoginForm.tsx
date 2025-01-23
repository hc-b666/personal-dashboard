import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../services/authApi";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { toast } from "@/common/hooks/use-toast";

interface LoginFormBody {
  email: string;
  password: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormBody>();

  const onSubmit: SubmitHandler<LoginFormBody> = async (data) => {
    try {
      const res = await login(data).unwrap();
      toast({ description: res.message });
      navigate("/main/profile");
    } catch (err) {
      const msg = (err as any).data.message;
      toast({ variant: "destructive", description: msg });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[450px] p-8 flex flex-col gap-4 border rounded-lg"
    >
      <div className="flex flex-col gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-xs text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="text-sm flex items-center gap-1">
        <p>No account?</p>
        <Link to="/auth/register" className="text-blue-500 underline">
          Register here.
        </Link>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
