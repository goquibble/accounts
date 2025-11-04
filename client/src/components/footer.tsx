import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "flex items-center gap-2 mt-auto sm:mt-4 mx-auto w-max",
        className,
      )}
    >
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
  );
}
