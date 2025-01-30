import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RouteGuard from "./RouteGuard";
import PublicLayout from "@/pages/public/public-layout";
import AuthLayout from "@/pages/auth/auth-layout";
import PrivateLayout from "@/pages/private/private-layout";
import PortfolioLayout from "@/portfolio/portfolio-layout";

const HomePage = lazy(() => import("@/pages/public/home"));

const LoginPage = lazy(() => import("@/pages/auth/login"));
const RegisterPage = lazy(() => import("@/pages/auth/register"));

const ProfilePage = lazy(() => import("@/pages/private/profile"));
const AboutMePage = lazy(() => import("@/pages/private/about-me"));
const CreateProjectPage = lazy(() => import("@/pages/private/create-project"));
const ProjectsPage = lazy(() => import("@/pages/private/projects"));
const PublicApisPage = lazy(() => import("@/pages/private/public-apis"));

const PortfolioLandingPage = lazy(() => import("@/portfolio/pages/Home"));
const PortfolioProjectsPage = lazy(() => import("@/portfolio/pages/Projects"));

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
                  <Route path="/about-me" element={<AboutMePage />} />
                  <Route
                    path="/projects/create"
                    element={<CreateProjectPage />}
                  />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/public-apis" element={<PublicApisPage />} />
                </Routes>
              </PrivateLayout>
            }
          />

          <Route
            path="/portfolio/:userId/*"
            element={
              <PortfolioLayout>
                <Routes>
                  <Route path="/" element={<PortfolioLandingPage />} />
                  <Route path="/projects" element={<PortfolioProjectsPage />} />
                </Routes>
              </PortfolioLayout>
            }
          />
        </Routes>
      </Suspense>
    </RouteGuard>
  );
}
