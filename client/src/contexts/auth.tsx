import { createContext, useContext, useState } from "react";
import type { User } from "@/types/user";

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	return (
		<AuthContext.Provider value={{ user, isAuthenticated: !!user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (!context) throw new Error("Use this inside <AuthProvider>.");

	return context;
}
