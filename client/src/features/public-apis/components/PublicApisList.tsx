import CopyButton from "@/common/components/core/CopyButton";
import { Label } from "@/common/components/ui/label";
import { Textarea } from "@/common/components/ui/textarea";
import { publicApis } from "@/common/constants";
import useAuth from "@/features/auth/hooks/useAuth";

export default function PublicApisList() {
  const { user } = useAuth();

  if (!user) return;

  return (
    <div className="flex flex-col gap-5">
      {publicApis.map((api) => (
        <div className="flex flex-col gap-3">
          <Label key={api.id} htmlFor={api.id}>
            {api.label}
          </Label>
          <div className="relative">
            <Textarea value={`${api.url}/${user.id}`} readOnly id={api.id} />
            <CopyButton
              text={`${api.url}/${user.id}`}
              className="absolute right-5 -top-6"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
