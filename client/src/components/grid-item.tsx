import { cn } from "@/lib/utils";
import { Icons } from "./icons";

interface GridItemProps {
  title: string;
  subTitle: string;
  imageSrc: string;
  iconClassName?: string;
  children: React.ReactNode;
}

export default function GridItem({
  title,
  subTitle,
  imageSrc,
  iconClassName,
  children,
}: GridItemProps) {
  return (
    <div className="border border-border rounded-xl flex flex-col">
      <div className="flex items-center p-4 border-b border-border gap-4">
        <div className="flex flex-col">
          <h4 className="text-lg">{title}</h4>
          <span className="text-sm text-muted-foreground">{subTitle}</span>
        </div>
        <img src={imageSrc} alt={title} className="size-16" />
      </div>
      <div className="p-4 hover:bg-muted/25 transition-colors rounded-b-xl flex items-center">
        {children}
        <Icons.arrowRight
          className={cn("text-muted-foreground size-4 ml-auto", iconClassName)}
        />
      </div>
    </div>
  );
}
