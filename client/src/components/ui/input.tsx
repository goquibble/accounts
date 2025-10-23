import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  wrapperClassName?: string;
  placeholderClassName?: string;
}

export default function Input({
  className,
  placeholder,
  wrapperClassName,
  placeholderClassName,
  ...props
}: InputProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={cn("relative w-full", wrapperClassName)}>
      <input
        id={id}
        ref={inputRef}
        placeholder=""
        className={cn(
          "peer border-2 border-border focus:border-primary focus:outline-none transition-colors h-13 px-4 rounded-xl w-full",
          className,
        )}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none transition-all bg-background px-1",
          "peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary",
          "peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-sm",
          placeholderClassName,
        )}
      >
        {placeholder}
      </label>
    </div>
  );
}
