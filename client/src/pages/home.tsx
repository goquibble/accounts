import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import Footer from "@/components/footer";
import { Icons } from "@/components/icons";
import InteractiveAvatar from "@/components/interactive-avatar";
import {
	Popover,
	PopoverAnchor,
	PopoverContent,
} from "@/components/ui/popover";
import { useAuth } from "@/contexts/auth";
import { useDialog } from "@/contexts/dialog";
import { cn } from "@/lib/utils";

export default function Home() {
	document.title = "Quibble Account";
	const { user } = useAuth();
	const { openDialog } = useDialog();
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const items = [
		{ name: "Home", href: "/", icon: Icons.home, subtitle: "Quibble Account" },
		{
			name: "Personal Info",
			href: "/personal-info",
			icon: Icons.user,
			subtitle: "See your profile",
		},
		{
			name: "Name",
			href: "/personal-info/name",
			icon: Icons.idCard,
			subtitle: "Personal info",
		},
		{
			name: "Username",
			href: "/personal-info/username",
			icon: Icons.idCardLanyard,
			subtitle: "Personal info",
		},
		{
			name: "Password",
			href: "/personal-info/password",
			icon: Icons.password,
			subtitle: "Personal info",
		},
		{
			name: "Log out",
			href: "#",
			icon: Icons.logout,
			action: () => openDialog("logout-confirm"),
			subtitle: "Sign out of your account",
		},
	];

	const filteredItems = items.filter((item) =>
		item.name.toLowerCase().includes(query.toLowerCase()),
	);

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
				<Icons.search className="absolute left-4 text-muted-foreground size-5 z-10" />
				<Popover open={open && filteredItems.length > 0} onOpenChange={setOpen}>
					<PopoverAnchor asChild>
						<input
							className={cn(
								"h-14 w-full bg-input outline-none px-6 pl-12",
								open && filteredItems.length > 0
									? "rounded-t-3xl rounded-b-md"
									: "rounded-full",
							)}
							placeholder="Search Quibble Account"
							value={query}
							onChange={(e) => {
								setQuery(e.target.value);
								setOpen(true);
							}}
							onClick={() => setOpen(true)}
						/>
					</PopoverAnchor>
					<PopoverContent
						avoidCollisions={false}
						className="p-0 w-[var(--radix-popover-trigger-width)] gap-0 rounded-xl rounded-t-md overflow-hidden"
						onOpenAutoFocus={(e) => e.preventDefault()}
					>
						<div className="px-3 py-1 text-sm text-muted-foreground">
							Quibble Account results
						</div>
						<div className="flex flex-col p-1 pt-0">
							{filteredItems.slice(0, 4).map((item) => (
								<button
									key={item.href}
									type="button"
									className={cn(
										"flex items-center gap-4 px-3 py-2 text-sm text-left hover:bg-accent/75 rounded-lg relative",
										"hover:before:w-1 hover:before:bg-primary before:content-[''] before:absolute before:-left-1 before:h-full before:rounded-r-lg before:z-10",
									)}
									onClick={() => {
										if (item.action) {
											item.action();
										} else {
											navigate(item.href);
										}
										setOpen(false);
									}}
								>
									<item.icon className="size-5 text-muted-foreground" />
									<div className="flex flex-col">
										<span className="font-medium text-foreground">
											{item.name}
										</span>
										<span className="text-muted-foreground text-xs">
											{item.subtitle}
										</span>
									</div>
								</button>
							))}
						</div>
						<div className="p-3 py-1.5 text-sm">
							<a
								href="https://github.com/orgs/goquibble/discussions"
								target="_blank"
								rel="noreferrer"
								className="text-muted-foreground underline"
							>
								Search Help Center {query && `for "${query}"`}
							</a>
						</div>
					</PopoverContent>
				</Popover>
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
