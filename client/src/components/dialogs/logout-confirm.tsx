import { useState } from "react";
import { useDialog } from "@/contexts/dialog";
import { logOut } from "@/lib/auth";
import { Icons } from "../icons";
import Button from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";

export default function LogoutConfirmDialog() {
	const { dialog, closeDialog } = useDialog();
	const [loggingOut, setLoggingOut] = useState(false);

	const isOpen = dialog === "logout-confirm";

	const handleLogOut = async () => {
		try {
			setLoggingOut(true);
			await logOut();
			// redirect with refresh states
			window.location.replace("/log-in");
		} catch (err) {
			console.error(err);
		} finally {
			setLoggingOut(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Confirm Log out</DialogTitle>
					<DialogDescription>
						You are about to log out of your account. Any unsaved changes will
						be lost. Are you sure you want to continue?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						variant="outline"
						className="h-11"
						onClick={closeDialog}
						disabled={loggingOut}
					>
						Cancel
					</Button>
					<Button
						className="h-11 gap-2"
						onClick={handleLogOut}
						disabled={loggingOut}
					>
						<Icons.logout className="size-4" />
						{loggingOut ? "Logging out..." : "Log out"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
