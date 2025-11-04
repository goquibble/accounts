import { Outlet } from "react-router";
import Header from "@/components/header";
import { cn } from "@/lib/utils";

interface LayoutProps {
  className?: string;
}

export default function AuthLayout({ className }: LayoutProps) {
  return (
    <main
      className={cn(
        "max-w-90 min-h-dvh mx-auto p-4 pt-[15vh] flex flex-col items-center gap-4",
        className,
      )}
    >
      <Header className="fixed" />
      <Outlet />
      <footer className="flex items-center gap-2 mt-auto sm:mt-4">
        <a
          href="https://legal.goquibble.online/terms-of-use"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted-foreground underline"
        >
          Terms of Use
        </a>
        <span className="text-muted-foreground text-sm">—</span>
        <a
          href="https://legal.goquibble.online/privacy-policy"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted-foreground underline"
        >
          Privacy Policy
        </a>
      </footer>
    </main>
  );
}
