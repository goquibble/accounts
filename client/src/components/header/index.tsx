import { NavLink } from "react-router";
import { cn } from "@/lib/utils";
import AvatarBtn from "./avatar-btn";

interface HeaderProps {
	className?: string;
}

export default function Header({ className }: HeaderProps) {
	return (
		<header
			className={cn(
				"sticky top-0 inset-x-0 p-4 flex items-center justify-between",
				className,
			)}
		>
			<NavLink to="/" className="flex items-center gap-2 w-max">
				<img src="/favicon.svg" alt="Quibble" className="size-6" />
				<span className="text-xl">
					<span className="font-semibold">Quibble</span> Account
				</span>
			</NavLink>
			<div className="flex items-center gap-2">
				<AvatarBtn />
			</div>
		</header>
	);
}
