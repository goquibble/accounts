export const API_ENDPOINTS = {
	// auth endpoints
	AUTH_CHECK_EMAIL: (email: string) => `api/v1/auth/check-email/${email}`,
	AUTH_LOGIN: "api/v1/auth/login",
	AUTH_LOGOUT: "api/v1/auth/logout",
	AUTH_REFRESH_TOKEN: "api/v1/auth/refresh-token",
	AUTH_VERIFY_PASSWORD: "api/v1/auth/verify-password",
	AUTH_RESET_PASSWORD: "api/v1/auth/reset-password",
	AUTH_REGISTER: "api/v1/auth/register",
	// users endpoints
	USERS_ME: "api/v1/users/me",
	// utils urls
	UTILS_REQUEST_PAGE: "api/v1/utils/request-page",
	UTILS_ACCOUNT_DELETE_REQUEST: "api/v1/utils/account-delete-request",
};
