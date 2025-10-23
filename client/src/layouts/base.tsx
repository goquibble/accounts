import Footer from "@/components/footer";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function BaseLayout({ children, className }: LayoutProps) {
  return (
    <main
      className={cn(
        "max-w-90 mx-auto p-4 pt-14 flex flex-col items-center gap-4",
        className,
      )}
    >
      {children}
      <Footer />
    </main>
  );
}
