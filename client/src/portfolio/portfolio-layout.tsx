import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";

interface Props {
  children: React.ReactNode;
}

export default function PortfolioLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col 2xl:justify-start text-black dark:text-white bg-white dark:bg-black relative">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
