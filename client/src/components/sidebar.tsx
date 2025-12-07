import { NavLink } from "react-router";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";

const navLinks = [
  {
    href: "/",
    label: "Home",
    Icon: Icons.home,
  },
  {
    href: "/personal-info",
    label: "Personal info",
    Icon: Icons.idCard,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex flex-col gap-2">
      {navLinks.map(({ href, label, Icon }, idx) => (
        <NavLink
          key={href + idx.toString()}
          to={href}
          className={({ isActive }) =>
            cn(
              "p-2 pr-4 w-max rounded-full hover:bg-accent transition-colors flex items-center gap-2 border border-border",
              isActive && "bg-muted",
            )
          }
        >
          <div className="size-10 rounded-full bg-secondary/75 grid place-items-center">
            <Icon className="text-secondary-foreground size-5" />
          </div>
          <span className="font-medium text-sm">{label}</span>
        </NavLink>
      ))}
    </aside>
  );
}
