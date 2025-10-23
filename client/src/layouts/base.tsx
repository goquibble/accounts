import { Outlet } from "react-router";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { cn } from "@/lib/utils";

interface LayoutProps {
  className?: string;
}

export default function BaseLayout({ className }: LayoutProps) {
  return (
    <main
      className={cn(
        "max-w-90 min-h-dvh mx-auto p-4 pt-[15vh] flex flex-col items-center gap-4",
        className,
      )}
    >
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
