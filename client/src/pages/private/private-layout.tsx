import Footer from "@/common/components/core/Footer";
import Navbar from "@/common/components/core/Navbar";
import Sidebar from "@/common/components/core/Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: Props) {
  return (
    <div className="w-full min-h-screen flex flex-col gap-10 text-black dark:text-white bg-white dark:bg-black">
      <Navbar />
      <div className="container flex-grow grid grid-cols-5 gap-10 border rounded-md border-zinc-300 dark:border-zinc-700">
        <Sidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
}
