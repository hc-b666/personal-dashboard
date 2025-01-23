import Footer from "@/common/components/core/Footer";
import Navbar from "@/common/components/core/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {
  return (
    <div className="w-full min-h-screen flex flex-col gap-10">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
