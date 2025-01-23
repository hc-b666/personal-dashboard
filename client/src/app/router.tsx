import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RouteGuard from "./RouteGuard";
import PublicLayout from "@/pages/public/public-layout";
import AuthLayout from "@/pages/auth/auth-layout";
import PrivateLayout from "@/pages/private/private-layout";

const HomePage = lazy(() => import("@/pages/public/home"));

const LoginPage = lazy(() => import("@/pages/auth/login"));
const RegisterPage = lazy(() => import("@/pages/auth/register"));

const ProfilePage = lazy(() => import("@/pages/private/profile"));
const ProjectsPage = lazy(() => import("@/pages/private/projects"));

export default function Router() {
  return (
    <RouteGuard>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/*"
            element={
              <PublicLayout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                </Routes>
              </PublicLayout>
            }
          />

          <Route
            path="/auth/*"
            element={
              <AuthLayout>
                <Routes>
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/login" element={<LoginPage />} />
                </Routes>
              </AuthLayout>
            }
          />

          <Route
            path="/main/*"
            element={
              <PrivateLayout>
                <Routes>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                </Routes>
              </PrivateLayout>
            }
          />
        </Routes>
      </Suspense>
    </RouteGuard>
  );
}
