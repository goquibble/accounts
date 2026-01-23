import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { useAuth } from "@/contexts/auth";
import api from "@/lib/api";
import { tokenStore } from "@/lib/token-store";
import type { User } from "@/types/user";

export default function GoogleAuth() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { setUser } = useAuth();

	useEffect(() => {
		const accessToken = searchParams.get("access_token");

		if (accessToken) {
			tokenStore.set(accessToken);
			api.get<User>(API_ENDPOINTS.USERS_ME).then((res) => {
				setUser(res.data);
				navigate("/");
			});
		} else {
			navigate("/log-in");
		}
	}, [searchParams, navigate, setUser]);

	return <div>Authenticating...</div>;
}
