import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import api from "@/lib/api";
import type { User } from "@/types/user";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api.get<User>(API_ENDPOINTS.USERS_ME).then((res) => {
      setUser(res.data);
      document.title = `${res.data.name ?? res.data.username} — GoQuibble`;
    });
  }, []);

  if (!user) return null;
  return (
    <div>
      <span>Hi, {user.username}!</span>
      <img
        src={`http://localhost:8001/1.x/avatar/png?seed=${user.username}`}
        alt={user.username}
      />
    </div>
  );
}
