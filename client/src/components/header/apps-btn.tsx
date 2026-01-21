import { useAuth } from "@/contexts/auth";
import { Icons } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const apps = [
	{
		name: "Quibble",
		url: "https://goquibble.online",
		icon: <img src="/favicon.svg" alt="Quibble" className="size-6 mt-1.5" />,
	},
	{
		name: "GitHub",
		url: "https://github.com/orgs/goquibble",
		icon: <Icons.github className="size-6 fill-popover-foreground mt-1.5" />,
	},
];

export default function AppsBtn() {
	const { user } = useAuth();

	if (!user) {
		return null;
	}

	return (
		<Popover>
			<PopoverTrigger className="size-8 rounded-full hover:bg-muted transition-colors grid place-items-center">
				<Icons.grip className="size-5" />
			</PopoverTrigger>
			<PopoverContent
				sideOffset={10}
				className="mr-4 grid grid-cols-3 gap-1 p-2 rounded-2xl w-60"
			>
				<a
					href="/"
					target="_blank"
					rel="noreferrer"
					className="flex flex-col items-center justify-center gap-1 size-full aspect-square rounded-xl hover:bg-accent/75 transition-colors"
				>
					<Avatar className="size-7 mt-1.5">
						<AvatarImage src={user.avatar_url ?? ""} />
						<AvatarFallback seed={user.username} />
					</Avatar>
					<span className="text-sm">Account</span>
				</a>
				{apps.map((app) => (
					<a
						href={app.url}
						target="_blank"
						rel="noreferrer"
						className="flex flex-col items-center justify-center gap-1.5 size-full aspect-square rounded-xl hover:bg-accent/75 transition-colors"
						key={app.name}
					>
						{app.icon}
						<span className="text-sm">{app.name}</span>
					</a>
				))}
			</PopoverContent>
		</Popover>
	);
}
