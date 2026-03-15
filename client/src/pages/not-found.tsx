import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Button from "@/components/ui/button";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import api from "@/lib/api";

export default function NotFound() {
	const location = useLocation();
	const navigate = useNavigate();
	const [requested, setRequested] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		document.title = "404 – Not Found";

		// Check if this path has already been requested
		const requestedPages = JSON.parse(
			localStorage.getItem("requested_pages") || "[]",
		);
		if (requestedPages.includes(location.pathname)) {
			setRequested(true);
		}
	}, [location.pathname]);

	const handleRequestPage = async () => {
		setLoading(true);
		try {
			await api.post(API_ENDPOINTS.UTILS_REQUEST_PAGE, {
				path: location.pathname,
				user_agent: navigator.userAgent,
			});

			// Update local state and localStorage
			const requestedPages = JSON.parse(
				localStorage.getItem("requested_pages") || "[]",
			);
			if (!requestedPages.includes(location.pathname)) {
				requestedPages.push(location.pathname);
				localStorage.setItem("requested_pages", JSON.stringify(requestedPages));
			}
			setRequested(true);
		} catch (error) {
			console.error("Failed to send request", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4">
			<h1 className="text-9xl font-bold mb-4 text-primary flex items-center gap-2">
				4<img src="/favicon.svg" alt="0" className="size-25" />4
			</h1>
			<h2 className="text-2xl md:text-3xl font-semibold mb-2">
				Page Not Found
			</h2>
			<p className="text-neutral-400 mb-8 text-center max-w-lg">
				Sorry, the page you are looking for ({location.pathname}) does not exist
				yet. You can request this page to be created.
			</p>

			<Button
				type="button"
				onClick={handleRequestPage}
				disabled={requested || loading}
				className="w-max h-11"
			>
				{loading
					? "Sending Request..."
					: requested
						? "Request Sent"
						: "Request This Page"}
			</Button>

			<button
				type="button"
				className="mt-2 text-muted-foreground hover:text-foreground transition-colors text-sm underline underline-offset-4 bg-transparent border-none cursor-pointer"
				onClick={() => {
					if (window.history.length > 1) {
						navigate(-1);
					} else {
						navigate("/");
					}
				}}
			>
				Go Back
			</button>
		</div>
	);
}
