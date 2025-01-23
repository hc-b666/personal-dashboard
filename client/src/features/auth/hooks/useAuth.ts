import { useAppDispatch, useAppSelector } from "@/app/store";
import { logout } from "../slices/authSlice";

export default function useAuth() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return {
    ...auth,
    logout: () => dispatch(logout()),
  };
}
