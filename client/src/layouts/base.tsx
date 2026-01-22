import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import LogoutConfirmDialog from "@/components/dialogs/logout-confirm";
import ProfilePictureDialog from "@/components/dialogs/profile-picture";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { useAuth } from "@/contexts/auth";
import api from "@/lib/api";
import type { User } from "@/types/user";

export default function BaseLayout() {
	const { setUser } = useAuth();

	const {
		data: fetchUser,
		isError,
		isLoading,
	} = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const res = await api.get<User>(API_ENDPOINTS.USERS_ME);
			return res.data;
		},
	});

	useEffect(() => {
		if (fetchUser) setUser(fetchUser);
	}, [fetchUser, setUser]);

	if (isLoading) {
		return null;
	}

	if (isError || !fetchUser) {
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
