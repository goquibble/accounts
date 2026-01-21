import { useNavigate } from "react-router";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth";
import { useDialog } from "@/contexts/dialog";
import { cn, formatTimestamp } from "@/lib/utils";

export default function PersonalInfo() {
	document.title = "Personal info";
	const { user } = useAuth();
	const navigate = useNavigate();
	const { openDialog } = useDialog();

	if (!user) {
		return null;
	}

	const basicInfoItems = [
		{
			icon: Icons.camera,
			title: "Profile picture",
			description: "A profile picture that helps personalize your account",
			rounded: "rounded-t-2xl rounded-b-md",
			onClick: () => openDialog("profile-picture"),
			rightElement: (
				<Avatar className="size-10">
					<AvatarImage src={user.avatar_url ?? ""} />
					<AvatarFallback seed={user.username} />
				</Avatar>
			),
		},
		{
			icon: Icons.idCardLanyard,
			title: "Name",
			description: user.name ?? "Not set",
			rounded: "rounded-md",
			onClick: () => navigate("./name"),
		},
		{
			icon: Icons.user,
			title: "Username",
			description: user.username,
			rounded: "rounded-md",
			onClick: () => navigate("./username"),
		},
		{
			icon: Icons.cake,
			title: "Cake day",
			description: formatTimestamp(user.created_at),
			rounded: "rounded-md",
		},
		{
			icon: Icons.email,
			title: "Email (private)",
			description: user.email,
			rounded: "rounded-b-2xl rounded-t-md",
		},
	];

	return (
		<div className="flex flex-col gap-4 mx-auto max-w-150 w-full">
			<h1 className="text-3xl font-medium">Personal info</h1>
			<div className="flex flex-col gap-1">
				<h2 className="text-xl font-medium">
					Your profile info in Quibble services
				</h2>
				<p className="text-muted-foreground text-sm">
					Personal info and options to manage it. You can make some of this
					info, like your contact details, visible to others so they can reach
					you easily. You can also see a summary of your profiles.
				</p>
			</div>
			<div className="flex flex-col gap-1">
				<h3 className="text-lg font-medium">Basic info</h3>
				<p className="text-muted-foreground text-sm">
					Some info may be visible to other people using Quibble services.
				</p>
			</div>
			<div className="flex flex-col gap-1">
				{basicInfoItems.map((item) => (
					<button
						key={item.title}
						type="button"
						className={cn(
							"flex items-center gap-4 text-left bg-muted hover:bg-accent dark:hover:bg-accent/75 transition-colors p-3 pl-5 border",
							item.rounded,
						)}
						onClick={item.onClick}
					>
						<item.icon className="size-5" />
						<div className="flex flex-col">
							<span className="font-medium">{item.title}</span>
							{item.description && (
								<span className="text-sm text-muted-foreground">
									{item.description}
								</span>
							)}
						</div>
						{item.rightElement && (
							<div className="ml-auto">{item.rightElement}</div>
						)}
					</button>
				))}
			</div>
		</div>
	);
}
