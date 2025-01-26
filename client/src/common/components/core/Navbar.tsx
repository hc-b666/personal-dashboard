import useAuth from "@/features/auth/hooks/useAuth";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

export default function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="py-5 shadow-md rounded-b-2xl">
      <nav className="container flex items-center justify-between">
        <Logo />

        <div className="flex items-center">
          {isAuthenticated ? (
            <NavLink to="/main/profile" className="font-medium">
              Dashboard
            </NavLink>
          ) : (
            <NavLink to="/auth/login">
              <Button>Log In</Button>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
