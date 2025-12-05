import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet } from "react-router";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { useAuth } from "@/contexts/auth";
import api from "@/lib/api";
import type { User } from "@/types/user";

export default function BaseLayout() {
  const { setUser } = useAuth();

  const { data: fetchUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get<User>(API_ENDPOINTS.USERS_ME);
      return res.data;
    },
  });

  useEffect(() => {
    if (fetchUser) setUser(fetchUser);
  }, [fetchUser, setUser]);

  if (!fetchUser) {
    return null;
  }

  return (
    <main className="min-h-dvh">
      <Header />
      <section className="p-4 max-w-200 mx-auto">
        <Outlet />
        <Footer />
      </section>
    </main>
  );
}
