import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/auth";
import { DialogProvider } from "@/contexts/dialog";
import { ThemeProvider } from "@/contexts/theme";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<AuthProvider>
					<DialogProvider>{children}</DialogProvider>
				</AuthProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
