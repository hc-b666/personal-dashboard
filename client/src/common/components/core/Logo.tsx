import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <NavLink to="/">
      <h1 className="text-2xl font-semibold">Portfolio Dashboard</h1>
    </NavLink>
  );
}
