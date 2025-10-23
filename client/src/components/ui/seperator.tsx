interface SeperatorProps {
  children?: React.ReactNode;
}

export default function Seperator({ children }: SeperatorProps) {
  return (
    <span className="inline-flex items-center gap-4 w-full">
      <span className="h-px w-full bg-border"></span>
      {children && (
        <>
          <span className="text-sm font-medium">{children}</span>
          <span className="h-px w-full bg-border"></span>
        </>
      )}
    </span>
  );
}
