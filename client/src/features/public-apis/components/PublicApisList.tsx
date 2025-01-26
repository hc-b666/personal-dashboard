import CopyButton from "@/common/components/core/CopyButton";
import { Label } from "@/common/components/ui/label";
import { Textarea } from "@/common/components/ui/textarea";
import { BACKEND_BASE_URL } from "@/common/constants";
import useAuth from "@/features/auth/hooks/useAuth";

export default function PublicApisList() {
  const { user } = useAuth();

  if (!user) return;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Label htmlFor="public-projects-api">Your public projects API</Label>
        <div className="relative">
          <Textarea
            value={`${BACKEND_BASE_URL}/api/projects/${user.id}`}
            readOnly
            id="public-projects-api"
          />
          <CopyButton
            text={`${BACKEND_BASE_URL}/api/projects/${user.id}`}
            className="absolute right-5 -top-6"
          />
        </div>
      </div>
    </div>
  );
}
