import { cn } from "@/lib/utils";
import PosAndTos from "./pos-and-tos";

interface FooterProps {
	className?: string;
}

export default function Footer({ className }: FooterProps) {
	return (
		<footer className={cn("mt-auto sm:mt-2 mx-auto w-max", className)}>
			<PosAndTos />
		</footer>
	);
}
