import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Footer from "@/components/footer";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button from "@/components/ui/button";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { useAuth } from "@/contexts/auth";
import { useDialog } from "@/contexts/dialog";
import api from "@/lib/api";
import { cn, formatTimestamp } from "@/lib/utils";

export default function PersonalInfo() {
	document.title = "Personal info";
	const { user } = useAuth();
	const navigate = useNavigate();
	const { openDialog } = useDialog();
	const [deleteRequested, setDeleteRequested] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);

	useEffect(() => {
		// Check if account deletion has already been requested
		const deleteRequestStatus = localStorage.getItem(
			"account_delete_requested",
		);
		if (deleteRequestStatus === "true") {
			setDeleteRequested(true);
		}
	}, []);

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

	const passwordItems = [
		{
			icon: Icons.password,
			title: "Quibble Password",
			description: "Last updated 7 Jan 2026",
			rounded: "rounded-t-2xl rounded-b-md",
			onClick: () => navigate("./password"),
		},
		{
			icon: Icons.password,
			title: "Forgot Password?",
			description: "Update your password by sending a reset link to your email",
			rounded: "rounded-b-2xl rounded-t-md",
			onClick: () => {},
			disabled: true,
		},
	];

	const handleDeleteRequest = async () => {
		setDeleteLoading(true);
		try {
			await api.post(API_ENDPOINTS.UTILS_ACCOUNT_DELETE_REQUEST, {
				username: user.username,
				email: user.email,
				user_id: user.id,
			});

			// Update local state and localStorage
			localStorage.setItem("account_delete_requested", "true");
			setDeleteRequested(true);
		} catch (error) {
			console.error("Failed to send deletion request", error);
		} finally {
			setDeleteLoading(false);
		}
	};

	const dangerZoneItems = [
		{
			icon: Icons.trash,
			title: "Delete Account",
			description: "Request permanent deletion of your account and all data",
			rounded: "rounded-2xl",
			rightElement: (
				<Button
					type="button"
					onClick={handleDeleteRequest}
					disabled={deleteRequested || deleteLoading}
					variant="destructive"
					className="w-max h-10"
				>
					{deleteLoading
						? "Sending Request..."
						: deleteRequested
							? "Request Sent"
							: "Request Deletion"}
				</Button>
			),
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
			<div className="flex flex-col gap-1">
				<h3 className="text-lg font-medium">Password</h3>
				<p className="text-muted-foreground text-sm">
					A secure password helps protect your Quibble account.
				</p>
			</div>
			<div className="flex flex-col gap-1">
				{passwordItems.map((item) => (
					<button
						key={item.title}
						type="button"
						className={cn(
							"flex items-center gap-4 text-left bg-muted hover:bg-accent dark:hover:bg-accent/75 transition-colors p-3 pl-5 border",
							item.disabled && "pointer-events-none opacity-75",
							item.rounded,
						)}
						disabled={item.disabled}
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
					</button>
				))}
			</div>
			<div className="flex flex-col gap-1">
				<h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
				<p className="text-muted-foreground text-sm">
					Irreversible and destructive actions for your account.
				</p>
			</div>
			<div className="flex flex-col gap-1">
				{dangerZoneItems.map((item) => (
					<div
						key={item.title}
						className={cn(
							"flex items-center gap-4 text-left bg-destructive/25 p-3 pl-5 border border-destructive/50",
							item.rounded,
						)}
					>
						<item.icon className="size-5 text-destructive" />
						<div className="flex flex-col">
							<span className="font-medium">{item.title}</span>
							{item.description && (
								<span className="text-sm text-muted-foreground line-clamp-1">
									{item.description}
								</span>
							)}
						</div>
						{item.rightElement && (
							<div className="ml-auto">{item.rightElement}</div>
						)}
					</div>
				))}
			</div>
			<Footer className="sm:mt-0" />
		</div>
	);
}
