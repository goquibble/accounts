import { useEffect } from "react";
import { Outlet } from "react-router";
import Header from "@/components/header";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { useAuth } from "@/contexts/auth";
import api from "@/lib/api";
import type { User } from "@/types/user";

export default function BaseLayout() {
  const { setUser, user } = useAuth();

  useEffect(() => {
    api.get<User>(API_ENDPOINTS.USERS_ME).then((res) => {
      setUser(res.data);
    });
  }, [setUser]);

  // block rendering
  if (!user) return null;
  return (
    <main className="min-h-dvh">
      <Header />
      <section className="p-4 max-w-200 mx-auto">
        <Outlet />
      </section>
    </main>
  );
}
