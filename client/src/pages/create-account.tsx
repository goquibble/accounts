import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { Icons } from "@/components/icons";
import OAuthBtns from "@/components/oauth-btns";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Seperator from "@/components/ui/seperator";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import api from "@/lib/api";

export default function CreateAccount() {
	document.title = "Create Account – Quibble";
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const mutation = useMutation({
		mutationFn: (data: Record<string, string>) => {
			return api.post(API_ENDPOINTS.AUTH_REGISTER, data);
		},
		onSuccess: (response) => {
			const { email } = response.data;
			navigate("/log-in/password", {
				state: { email },
			});
		},
		onError: (error: AxiosError<{ detail: string }>) => {
			if (error.response?.data?.detail) {
				setError("root", { message: error.response.data.detail });
			} else {
				setError("root", {
					message: "Something went wrong. Please try again.",
				});
			}
		},
	});

	const onSubmit = (data: Record<string, string>) => {
		mutation.mutate(data);
	};

	return (
		<>
			<h1 className="text-3xl font-medium">Create your account</h1>
			<form className="space-y-3 w-full mt-4" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-1">
					<Input
						{...register("email", {
							required: "Email is required.",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "Email is not valid.",
							},
						})}
						name="email"
						placeholder="Email address"
						autoFocus
						autoComplete="off"
					/>
					{errors.email && (
						<span className="text-destructive text-sm inline-flex items-center gap-2">
							<Icons.info className="size-4" /> {errors.email.message}
						</span>
					)}
				</div>
				<div className="flex flex-col gap-1">
					<Input
						{...register("password", {
							required: "Password is required.",
							minLength: {
								value: 8,
								message: "Password must be at least 8 characters.",
							},
						})}
						name="password"
						type={showPassword ? "text" : "password"}
						placeholder="Password"
					>
						<button
							type="button"
							className="absolute right-2.5 top-1/2 -translate-y-1/2 size-8 rounded-lg hover:bg-muted grid place-items-center transition-colors"
							onClick={() => setShowPassword((prev) => !prev)}
						>
							<Icons.eye
								className="size-5 text-muted-foreground"
								open={!showPassword}
							/>
						</button>
					</Input>
					{errors.password && (
						<span className="text-destructive text-sm inline-flex items-center gap-2">
							<Icons.info className="size-4" /> {errors.password.message}
						</span>
					)}
				</div>
				{errors.root && (
					<span className="text-destructive text-sm inline-flex items-center gap-2">
						<Icons.info className="size-4" /> {errors.root.message}
					</span>
				)}
				<Button className="font-medium" disabled={mutation.isPending}>
					Create account
				</Button>
			</form>
			<span className="text-muted-foreground">
				Already have an account?{" "}
				<NavLink to={"/log-in"} className="text-primary hover:underline">
					Log in
				</NavLink>
			</span>
			<Seperator>OR</Seperator>
			<OAuthBtns disabled={mutation.isPending} />
		</>
	);
}
