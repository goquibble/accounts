import Button from "@/components/ui/button";
import { Icons } from "./icons";

interface OAuthBtnsProps {
	disabled: boolean;
}

export default function OAuthBtns({ disabled }: OAuthBtnsProps) {
	const handleGoogleLogin = () => {
		window.location.href = `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/auth/google/login`;
	};

	return (
		<div className="space-y-3 w-full">
			<Button
				variant="outline"
				className="justify-start"
				disabled={disabled}
				onClick={handleGoogleLogin}
			>
				<Icons.google className="size-5" />
				Continue with Google
			</Button>
			<Button variant="outline" className="justify-start" disabled>
				<Icons.discord className="size-5" />
				Continue with Discord
			</Button>
		</div>
	);
}
