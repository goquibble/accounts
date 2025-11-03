import { API_ENDPOINTS } from "@/constants/api-endpoints";
import api from "./api";

export async function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ access_token: string }> {
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);

  const { data } = await api.post<{ access_token: string }>(
    API_ENDPOINTS.AUTH_LOGIN,
    formData,
  );

  return data;
}

export async function refreshToken(): Promise<{ access_token: string }> {
  const { data } = await api.post<{ access_token: string }>(
    API_ENDPOINTS.AUTH_REFRESH_TOKEN,
  );

  return data;
}
