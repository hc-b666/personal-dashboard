import { Toaster } from "@/common/components/ui/toaster";
import Router from "./router";
import { ThemeProvider } from "@/common/providers/theme-provider";

export default function App() {
  return (
    <ThemeProvider>
      <Router />
      <Toaster />
    </ThemeProvider>
  );
}
