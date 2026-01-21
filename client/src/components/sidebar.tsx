import { NavLink } from "react-router";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";

const navLinks = [
	{
		href: "/",
		label: "Home",
		Icon: Icons.home,
		className: "bg-blue-400",
	},
	{
		href: "/personal-info",
		label: "Personal info",
		Icon: Icons.idCard,
		className: "bg-green-500",
	},
];

export default function Sidebar() {
	return (
		<aside className="hidden md:flex flex-col gap-2">
			{navLinks.map(({ href, label, Icon, className }, idx) => (
				<NavLink
					key={href + idx.toString()}
					to={href}
					className={({ isActive }) =>
						cn(
							"p-2 pr-4 w-max rounded-full hover:bg-accent/75 transition-colors flex items-center gap-2 border",
							isActive && "bg-muted",
						)
					}
				>
					<div
						className={cn(
							"size-10 rounded-full grid place-items-center",
							className,
						)}
					>
						<Icon className="text-background size-5" />
					</div>
					<span className="font-medium text-sm">{label}</span>
				</NavLink>
			))}
		</aside>
	);
}
