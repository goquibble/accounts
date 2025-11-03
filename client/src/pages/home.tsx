import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import api from "@/lib/api";
import type { User } from "@/types/user";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api.get<User>(API_ENDPOINTS.USERS_ME).then((res) => {
      setUser(res.data);
    });
  }, []);

  if (!user) return null;
  return <span>Hi, {user.username}!</span>;
}
