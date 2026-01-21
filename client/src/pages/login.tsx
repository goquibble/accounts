import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { Icons } from "@/components/icons";
import OAuthBtns from "@/components/oauth-btns";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Seperator from "@/components/ui/seperator";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import api from "@/lib/api";

export default function Login() {
	document.title = "Log in — Quibble";
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<{ email: string }>();

	const mutation = useMutation({
		mutationFn: (email: string) => {
			const url = API_ENDPOINTS.AUTH_CHECK_EMAIL(email);
			return api.get<boolean>(url);
		},
		onSuccess: ({ data: isCheckPassed }, email) => {
			if (!isCheckPassed) {
				setError("email", { message: "This account is inactive." });
			} else {
				navigate("./password", {
					state: { email },
				});
			}
		},
	});

	const onSubmit = (data: { email: string }) => {
		mutation.mutate(data.email);
	};

	return (
		<>
			<h1 className="text-3xl font-medium">Welcome back</h1>
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
				<Button className="font-medium" disabled={mutation.isPending}>
					Continue
				</Button>
			</form>
			<span className="text-muted-foreground">
				Don't have an account?{" "}
				<NavLink
					to={"/create-account"}
					className="text-primary hover:underline"
				>
					Sign up
				</NavLink>
			</span>
			<Seperator>OR</Seperator>
			<OAuthBtns disabled={mutation.isPending} />
		</>
	);
}
