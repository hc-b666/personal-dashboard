import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function GoBack() {
  const navigate = useNavigate();

  return (
    <Button type="button" onClick={() => navigate(-1)}>
      Go back
    </Button>
  );
}
