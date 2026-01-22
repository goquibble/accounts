import { NavLink } from "react-router";
import Footer from "@/components/footer";
import { Icons } from "@/components/icons";
import InteractiveAvatar from "@/components/interactive-avatar";
import { useAuth } from "@/contexts/auth";
import { useDialog } from "@/contexts/dialog";

export default function Home() {
	document.title = "Quibble Account";
	const { user } = useAuth();
	const { openDialog } = useDialog();

	if (!user) {
		return null;
	}

	return (
		<div className="flex flex-col items-center mx-auto max-w-150 w-full">
			<InteractiveAvatar />
			<h2 className="text-3xl font-medium mt-5 capitalize">
				{user.name ?? user.username}
			</h2>
			<span className="mt-1">{user.email}</span>
			<div className="mt-8 relative flex items-center w-full">
				<Icons.search className="absolute left-4 text-muted-foreground size-5" />
				<input
					className="h-14 rounded-full w-full bg-input outline-none px-6 pl-12"
					placeholder="Search Quibble Account"
					disabled
				/>
			</div>
			<div className="flex items-center justify-between mt-3 overflow-x-scroll scrollbar-hide gap-3">
				<a
					href="https://github.com/orgs/goquibble/discussions"
					target="_blank"
					rel="noreferrer"
					className="whitespace-nowrap border rounded-xl px-3 py-2 flex items-center gap-2 hover:bg-muted transition-colors"
				>
					<Icons.info className="text-muted-foreground size-4" />
					Need help?
				</a>
				<NavLink
					to="/personal-info/password"
					className="whitespace-nowrap border rounded-xl px-3 py-2 flex items-center gap-2 hover:bg-muted transition-colors"
				>
					<Icons.password className="text-muted-foreground size-4" />
					My password
				</NavLink>
				<button
					type="button"
					onClick={() => openDialog("logout-confirm")}
					className="whitespace-nowrap border rounded-xl px-3 py-2 flex items-center gap-2 hover:bg-muted transition-colors"
				>
					<Icons.logout className="text-muted-foreground size-4" />
					Log out
				</button>
			</div>
			<p className="text-sm text-muted-foreground mt-auto text-center">
				Only you can see your settings. Review your preferences anytime. You’re
				always in control of how your information is used. Quibble keeps your
				data private, safe, and secure.
			</p>
			<Footer />
		</div>
	);
}
