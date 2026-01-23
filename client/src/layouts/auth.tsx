import { Navigate, Outlet } from "react-router";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useAuth } from "@/contexts/auth";
import { cn } from "@/lib/utils";

interface LayoutProps {
	className?: string;
}

export default function AuthLayout({ className }: LayoutProps) {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return (
		<main
			className={cn(
				"max-w-90 min-h-dvh mx-auto p-4 pt-[15vh] flex flex-col items-center gap-4",
				className,
			)}
		>
			<Header className="fixed" />
			<Outlet />
			<Footer />
		</main>
	);
}
