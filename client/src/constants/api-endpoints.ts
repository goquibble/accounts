export const API_ENDPOINTS = {
  // auth endpoints
  AUTH_CHECK_EMAIL: (email: string) => `api/v1/auth/check-email/${email}`,
  AUTH_LOGIN: "api/v1/auth/login",
  AUTH_LOGOUT: "api/v1/auth/logout",
  AUTH_REFRESH_TOKEN: "api/v1/auth/refresh-token",
  // users endpoints
  USERS_ME: "api/v1/users/me",
};
