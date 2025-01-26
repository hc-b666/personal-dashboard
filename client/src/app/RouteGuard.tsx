import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

export default function RouteGuard({ children }: Props) {
  const { isAuthenticated, accessToken } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !accessToken && pathname.startsWith("/main")) {
      navigate("/auth/login", { replace: true });
    }

    if (isAuthenticated && accessToken && pathname.startsWith("/auth")) {
      navigate("/main/profile", { replace: true });
    }
  }, [isAuthenticated, accessToken, pathname, navigate]);

  return children;
}
