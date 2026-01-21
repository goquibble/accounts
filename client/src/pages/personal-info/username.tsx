import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Icons } from "@/components/icons";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useAuth } from "@/contexts/auth";
import { updateUser } from "@/lib/user";

export default function PersonalInfoUsername() {
	document.title = "Username";
	const { user, setUser } = useAuth();
	const navigate = useNavigate();
	const [username, setUsername] = useState(user?.username ?? "");

	const mutation = useMutation({
		mutationFn: updateUser,
		onSuccess(updatedUser) {
			setUser(updatedUser);
			navigate(-1);
		},
	});

	function handleSave() {
		if (username !== user?.username) {
			mutation.mutate({ username });
		}
	}

	if (!user) {
		return null;
	}

	return (
		<div className="flex flex-col gap-4 mx-auto max-w-125 w-full">
			<div className="flex items-center gap-2">
				<button
					type="button"
					className="size-8 grid place-items-center hover:bg-muted transition-colors rounded-full border"
					onClick={() => navigate(-1)}
				>
					<Icons.arrowRight className="-rotate-180 size-5 text-muted-foreground" />
				</button>
				<h1 className="text-3xl font-medium">Username</h1>
			</div>
			<p className="text-muted-foreground text-sm">
				Your username is your unique identity on Quibble. It can be used to
				login and is visible to others.
			</p>
			<Input
				placeholder="Username"
				defaultValue={user.username ?? username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<div className="flex flex-col gap-2">
				<span className="font-medium">Who can see your username</span>
				<div className="flex gap-2">
					<Icons.users className="size-6 text-muted-foreground" />
					<p className="text-sm text-muted-foreground">
						Anyone can see this info when they communicate with you or view
						content you create in Quibble services.
					</p>
				</div>
			</div>
			<div className="flex gap-4">
				<Button variant="outline" className="h-11" onClick={() => navigate(-1)}>
					Cancel
				</Button>
				<Button
					className="h-11"
					disabled={(user.username ?? "") === username || mutation.isPending}
					onClick={handleSave}
				>
					{mutation.isPending ? "Saving..." : "Save"}
				</Button>
			</div>
		</div>
	);
}
