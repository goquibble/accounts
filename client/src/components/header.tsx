import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={cn("sticky top-0 inset-x-0 p-4", className)}>
      <a
        href="https://github.com/goquibble"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 w-max"
      >
        <img src="/favicon.svg" alt="Quibble" className="size-6" />
        <span className="font-medium">GoQuibble</span>
      </a>
    </header>
  );
}
