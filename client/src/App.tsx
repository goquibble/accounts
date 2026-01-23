import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { API_ENDPOINTS } from "./constants/api-endpoints";
import { useAuth } from "./contexts/auth";
import AuthLayout from "./layouts/auth";
import BaseLayout from "./layouts/base";
import api from "./lib/api";
import { refreshToken } from "./lib/auth";
import { tokenStore } from "./lib/token-store";
import CreateAccount from "./pages/create-account";
import Home from "./pages/home";
import Login from "./pages/login";
import LoginPassword from "./pages/login/password";
import NotFound from "./pages/not-found";
import PersonalInfo from "./pages/personal-info";
import PersonalInfoName from "./pages/personal-info/name";
import PersonalInfoPassword from "./pages/personal-info/password";
import PersonalInfoUsername from "./pages/personal-info/username";
import type { User } from "./types/user";

export default function App() {
	const [loading, setLoading] = useState(true);
	const { setUser } = useAuth();

	useEffect(() => {
		refreshToken()
			.then(async ({ access_token }) => {
				tokenStore.set(access_token);
				const res = await api.get<User>(API_ENDPOINTS.USERS_ME);
				setUser(res.data);
			})
			.finally(() => setLoading(false));
	}, [setUser]);

	// block rendering
	// for TOKEN to fetch and set
	if (loading) {
		return null;
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<BaseLayout />}>
					<Route index element={<Home />} />
					<Route path="personal-info">
						<Route index element={<PersonalInfo />} />
						<Route path="name" element={<PersonalInfoName />} />
						<Route path="username" element={<PersonalInfoUsername />} />
						<Route path="password" element={<PersonalInfoPassword />} />
					</Route>
				</Route>
				<Route element={<AuthLayout />}>
					<Route path="log-in">
						<Route index element={<Login />} />
						<Route path="password" element={<LoginPassword />} />
					</Route>
					<Route path="create-account" element={<CreateAccount />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
