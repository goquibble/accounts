import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Icons } from "@/components/icons";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { resetPassword, verifyPassword } from "@/lib/auth";

export default function PersonalInfoPassword() {
	document.title = "Password";
	const navigate = useNavigate();
	const [step, setStep] = useState<"verify" | "reset">("verify");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [accessToken, setAccessToken] = useState("");
	const [error, setError] = useState("");

	const verifyMutation = useMutation({
		mutationFn: verifyPassword,
		onSuccess: (data) => {
			setAccessToken(data.access_token);
			setStep("reset");
			setError("");
		},
		onError: () => {
			setError("Incorrect password");
		},
	});

	const resetMutation = useMutation({
		mutationFn: () => resetPassword(accessToken, newPassword),
		onSuccess: () => {
			navigate(-1);
		},
		onError: () => {
			setError("Failed to reset password");
		},
	});

	function handleVerify() {
		if (!currentPassword) return;
		verifyMutation.mutate(currentPassword);
	}

	function handleReset() {
		if (!newPassword) return;
		resetMutation.mutate();
	}

	return (
		<div className="flex flex-col gap-4 mx-auto max-w-125 w-full">
			<div className="flex items-center gap-2">
				<button
					type="button"
					className="size-8 grid place-items-center hover:bg-muted transition-colors rounded-full border"
					onClick={() => navigate(-1)}
				>
					<Icons.arrowRight className="-rotate-180 size-5 text-muted-foreground" />
				</button>
				<h1 className="text-3xl font-medium">Password</h1>
			</div>

			{step === "verify" ? (
				<>
					<p className="text-muted-foreground text-sm">
						To continue, first verify it's you.
					</p>
					<Input
						type="password"
						placeholder="Current Password"
						value={currentPassword}
						autoFocus
						onChange={(e) => setCurrentPassword(e.target.value)}
					/>
				</>
			) : (
				<>
					<p className="text-muted-foreground text-sm">
						Enter your new password.
					</p>
					<Input
						type="password"
						placeholder="New Password"
						value={newPassword}
						autoFocus
						onChange={(e) => setNewPassword(e.target.value)}
					/>
				</>
			)}

			{error && <p className="text-red-500 text-sm">{error}</p>}

			<div className="flex gap-4">
				<Button variant="outline" className="h-11" onClick={() => navigate(-1)}>
					Cancel
				</Button>
				<Button
					className="h-11"
					disabled={
						step === "verify"
							? verifyMutation.isPending
							: resetMutation.isPending
					}
					onClick={step === "verify" ? handleVerify : handleReset}
				>
					{step === "verify"
						? verifyMutation.isPending
							? "Verifying..."
							: "Continue"
						: resetMutation.isPending
							? "Saving..."
							: "Save"}
				</Button>
			</div>
		</div>
	);
}
