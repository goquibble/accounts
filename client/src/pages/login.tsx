import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import InfoIcon from "@/components/icons/info";
import OAuthBtns from "@/components/oauth-btns";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Seperator from "@/components/ui/seperator";

export default function Login() {
  document.title = "Login — GoQuibble";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    navigate("./password", {
      state: { email: data.email },
    });
  };

  return (
    <>
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
            autoFocus
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
        <NavLink
          to={"/create-account"}
          className="text-primary hover:underline"
        >
          Sign up
        </NavLink>
      </span>
      <Seperator>OR</Seperator>
      <OAuthBtns disabled={isSubmitting} />
    </>
  );
}
