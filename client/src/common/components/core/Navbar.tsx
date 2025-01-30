import useAuth from "@/features/auth/hooks/useAuth";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="py-5 bg-white dark:bg-black border-b border-zinc-300 dark:border-zinc-700">
      <nav className="container flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-5">
          {isAuthenticated ? (
            <NavLink to="/main/profile" className="font-medium">
              Dashboard
            </NavLink>
          ) : (
            <NavLink to="/auth/login">
              <Button>Log In</Button>
            </NavLink>
          )}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
