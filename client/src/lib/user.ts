import { API_ENDPOINTS } from "@/constants/api-endpoints";
import api from "./api";

export const updateAvatar = async (avatar: File) => {
  const formData = new FormData();
  formData.append("avatar", avatar);

  const res = await api.patch(API_ENDPOINTS.USERS_ME, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};
