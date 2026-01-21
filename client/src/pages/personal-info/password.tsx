import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Icons } from "@/components/icons";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { resetPassword, verifyPassword } from "@/lib/auth";

type FormValues = {
	currentPassword?: string;
	newPassword?: string;
};

export default function PersonalInfoPassword() {
	document.title = "Password";
	const navigate = useNavigate();
	const [step, setStep] = useState<"verify" | "reset">("verify");
	const [accessToken, setAccessToken] = useState("");

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm<FormValues>({
		defaultValues: {
			currentPassword: "",
			newPassword: "",
		},
	});

	const currentPassword = watch("currentPassword");
	const newPassword = watch("newPassword");

	const verifyMutation = useMutation({
		mutationFn: verifyPassword,
		onSuccess: (data) => {
			setAccessToken(data.access_token);
			setStep("reset");
			clearErrors();
		},
		onError: () => {
			setError("currentPassword", { message: "Incorrect password" });
		},
	});

	const resetMutation = useMutation({
		mutationFn: (password: string) => resetPassword(accessToken, password),
		onSuccess: () => {
			navigate(-1);
		},
		onError: () => {
			setError("newPassword", { message: "Failed to reset password" });
		},
	});

	const onSubmit = (data: FormValues) => {
		if (step === "verify") {
			if (data.currentPassword) {
				verifyMutation.mutate(data.currentPassword);
			}
		} else {
			if (data.newPassword) {
				resetMutation.mutate(data.newPassword);
			}
		}
	};

	const isPending = verifyMutation.isPending || resetMutation.isPending;
	const isButtonDisabled = step === "verify" ? !currentPassword : !newPassword;

	return (
		<div className="flex flex-col gap-4 mx-auto max-w-150 w-full">
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

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				{step === "verify" ? (
					<>
						<p className="text-muted-foreground text-sm">
							To continue, first verify it's you.
						</p>
						<Input
							type="password"
							placeholder="Current Password"
							{...register("currentPassword")}
							autoFocus
							autoComplete="current-password"
						/>
						{errors.currentPassword && (
							<span className="text-destructive text-sm inline-flex items-center gap-2 -mt-3">
								<Icons.info className="size-4" />{" "}
								{errors.currentPassword.message}
							</span>
						)}
					</>
				) : (
					<>
						<p className="text-muted-foreground text-sm">
							Enter your new password.
						</p>
						<Input
							type="password"
							placeholder="New Password"
							{...register("newPassword")}
							autoFocus
							autoComplete="new-password"
						/>
						{errors.newPassword && (
							<span className="text-destructive text-sm inline-flex items-center gap-2 -mt-3">
								<Icons.info className="size-4" /> {errors.newPassword.message}
							</span>
						)}
					</>
				)}

				<div className="flex gap-4">
					<Button
						variant="outline"
						className="h-11"
						type="button"
						onClick={() => navigate(-1)}
					>
						Cancel
					</Button>
					<Button
						className="h-11"
						disabled={isPending || isButtonDisabled}
						type="submit"
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
			</form>
		</div>
	);
}
