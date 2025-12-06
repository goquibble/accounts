import { API_ENDPOINTS } from "@/constants/api-endpoints";
import type { User } from "@/types/user";
import api from "./api";

type FormField = string | File | undefined | null;

interface UpdateUserPayload {
  username?: string;
  name?: string | null;
  avatar?: File | null;
  delete_avatar?: boolean;
}

export const updateUser = async (payload: UpdateUserPayload) => {
  const formData = new FormData();

  const fields: Record<string, FormField> = {
    username: payload.username,
    name: payload.name ?? "",
    avatar: payload.avatar,
    delete_avatar: payload.delete_avatar ? "true" : undefined,
  };

  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  }

  const res = await api.patch<User>(API_ENDPOINTS.USERS_ME, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};
