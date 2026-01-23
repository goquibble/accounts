import { Navigate, Outlet } from "react-router";
import LogoutConfirmDialog from "@/components/dialogs/logout-confirm";
import ProfilePictureDialog from "@/components/dialogs/profile-picture";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { useAuth } from "@/contexts/auth";

export default function BaseLayout() {
	const { user } = useAuth();

	if (!user) {
		return <Navigate to="/log-in" replace />;
	}

	return (
		<main className="min-h-dvh flex flex-col">
			<Header />
			<section className="flex gap-4 p-4 flex-1">
				<Sidebar />
				<Outlet />
			</section>
			<ProfilePictureDialog />
			<LogoutConfirmDialog />
		</main>
	);
}
