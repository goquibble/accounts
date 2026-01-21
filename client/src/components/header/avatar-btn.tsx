import { useAuth } from "@/contexts/auth";
import { useDialog } from "@/contexts/dialog";
import { useTheme } from "@/contexts/theme";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import InteractiveAvatar from "../interactive-avatar";
import PosAndTos from "../pos-and-tos";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	Popover,
	PopoverContent,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "../ui/popover";

export default function AvatarBtn() {
	const { user } = useAuth();
	const { openDialog } = useDialog();
	const { theme, setTheme } = useTheme();
	const isDarkMode =
		theme === "dark" ||
		(theme === "system" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches);

	if (!user) {
		return null;
	}

	return (
		<Popover>
			<PopoverTrigger>
				<Avatar>
					<AvatarImage src={user.avatar_url ?? ""} />
					<AvatarFallback seed={user.username} />
				</Avatar>
			</PopoverTrigger>
			<PopoverContent
				align="end"
				sideOffset={10}
				className="items-center gap-3 p-3 rounded-2xl w-80"
			>
				<PopoverHeader className="text-center">
					<PopoverTitle className="text-muted-foreground">
						{user.email}
					</PopoverTitle>
				</PopoverHeader>
				<InteractiveAvatar />
				<span className="text-center text-xl capitalize">
					Hi, {user.name ?? user.username}!
				</span>
				<div className="w-full flex items-center gap-1">
					<button
						type="button"
						onClick={() => setTheme(isDarkMode ? "light" : "dark")}
						className={cn(
							"flex-1 flex items-center gap-2 bg-secondary/15 rounded-l-4xl rounded-r-md p-3 hover:bg-secondary/25 transition-colors",
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
						className="flex-1 flex items-center gap-2 bg-secondary/15 rounded-r-4xl rounded-l-md p-3 hover:bg-secondary/25 transition-colors"
						onClick={() => openDialog("logout-confirm")}
					>
						<Icons.logout className="size-5 text-muted-foreground" />
						<span className="font-medium">Logout</span>
					</button>
				</div>
				<PosAndTos />
			</PopoverContent>
		</Popover>
	);
}
