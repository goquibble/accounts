import { cn } from "@/lib/utils";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "default" | "outline";
}

export default function Button({
  variant = "default",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "h-13 px-4 rounded-xl w-full transition flex items-center gap-4 justify-center",
        "disabled:opacity-75 disabled:pointer-events-none",
        variant === "default"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-border hover:bg-muted",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
