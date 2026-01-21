import { NavLink } from "react-router";
import { useAuth } from "@/contexts/auth";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import InteractiveAvatar from "./interactive-avatar";
import PosAndTos from "./pos-and-tos";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	Popover,
	PopoverContent,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "./ui/popover";

interface HeaderProps {
	className?: string;
}

export default function Header({ className }: HeaderProps) {
	const { user } = useAuth();
	const isDarkMode = true;

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
			{user && (
				<Popover>
					<PopoverTrigger>
						<Avatar>
							<AvatarImage src={user.avatar_url ?? ""} />
							<AvatarFallback seed={user.username} />
						</Avatar>
					</PopoverTrigger>
					<PopoverContent
						align="end"
						sideOffset={6}
						className="items-center gap-3 p-3 bg-muted/75 rounded-2xl"
					>
						<PopoverHeader className="text-center">
							<PopoverTitle>{user.email}</PopoverTitle>
						</PopoverHeader>
						<InteractiveAvatar />
						<span className="text-center text-xl capitalize">
							Hi, {user.name ?? user.username}!
						</span>
						<div className="w-full flex items-center gap-1">
							<button
								type="button"
								className={cn(
									"flex-1 flex items-center gap-2 bg-secondary/15 rounded-l-4xl rounded-r-lg p-3 hover:bg-secondary/25 transition-colors",
									isDarkMode &&
										"bg-primary text-primary-foreground hover:bg-primary/90",
								)}
							>
								<Icons.moon
									className={cn(
										"size-5 text-muted-foreground",
										isDarkMode && "text-primary-foreground",
									)}
								/>
								<span className="font-medium">Dark Mode</span>
							</button>
							<button
								type="button"
								className="flex-1 flex items-center gap-2 bg-secondary/15 rounded-r-4xl rounded-l-lg p-3 hover:bg-secondary/25 transition-colors"
							>
								<Icons.logout className="size-5 text-muted-foreground" />
								<span className="font-medium">Logout</span>
							</button>
						</div>
						<PosAndTos />
					</PopoverContent>
				</Popover>
			)}
		</header>
	);
}
