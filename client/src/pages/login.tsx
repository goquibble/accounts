import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import DiscordIcon from "@/components/icons/discord";
import GoogleIcon from "@/components/icons/google";
import InfoIcon from "@/components/icons/info";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import BaseLayout from "@/layouts/base";

export default function Login() {
  document.title = "Login — GoQuibble";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
  };

  return (
    <BaseLayout>
      <img src="/favicon.svg" alt="Quibble" className="size-10" />
      <h1 className="text-3xl font-medium">Welcome back</h1>
      <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
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
            autoComplete="off"
          />
          {errors.email && (
            <span className="text-destructive text-sm inline-flex items-center gap-2">
              <InfoIcon className="size-4" /> {errors.email.message}
            </span>
          )}
        </div>
        <Button className="font-medium" disabled={isSubmitting}>
          Continue
        </Button>
      </form>
      <span className="text-muted-foreground">
        Don't have an account?{" "}
        <NavLink to={"/register"} className="text-primary hover:underline">
          Sign up
        </NavLink>
      </span>
      <span className="inline-flex items-center gap-4 w-full">
        <span className="h-px w-full bg-border"></span>
        <span className="text-sm font-medium">OR</span>
        <span className="h-px w-full bg-border"></span>
      </span>
      <Button
        variant="outline"
        className="justify-start"
        disabled={isSubmitting}
      >
        <GoogleIcon className="size-5" />
        Continue with Google
      </Button>
      <Button variant="outline" className="justify-start" disabled>
        <DiscordIcon className="size-5" />
        Continue with Discord
      </Button>
    </BaseLayout>
  );
}
