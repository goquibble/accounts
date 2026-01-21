import { useAuth } from "@/contexts/auth";
import { useDialog } from "@/contexts/dialog";
import { Icons } from "./icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function InteractiveAvatar() {
	const { openDialog } = useDialog();
	const { user } = useAuth();

	return (
		<button
			type="button"
			className="relative w-max"
			onClick={() => openDialog("profile-picture")}
		>
			<Avatar className="size-25">
				<AvatarImage src={user?.avatar_url ?? ""} />
				<AvatarFallback seed={user?.username} />
			</Avatar>
			<Icons.camera className="absolute bottom-0 right-0 bg-muted rounded-full size-8 p-1.5 text-muted-foreground" />
		</button>
	);
}
