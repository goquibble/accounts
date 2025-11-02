import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router";
import { Icons } from "@/components/icons";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import api from "@/lib/api";

export default function LoginPassword() {
  document.title = "Log in — GoQuibble";

  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<{ password: string }>();

  const onSubmit = async (data: { password: string }) => {
    const formData = new FormData();
    formData.append("username", location.state.email);
    formData.append("password", data.password);

    try {
      const res = await api.post(API_ENDPOINTS.AUTH_LOGIN, formData);
      console.log(res.data);
    } catch (err) {
      // @ts-expect-error: error response isn't typed
      setError("password", { message: err.response.data.detail });
    }
  };

  return (
    <>
      <h1 className="text-3xl font-medium">Enter Password</h1>
      <form className="space-y-3 w-full mt-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder="Email address"
          autoComplete="off"
          value={location.state.email}
          readOnly
          className="pr-18"
        >
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 hover:underline text-primary"
            onClick={() => navigate("/log-in")}
          >
            Edit
          </button>
        </Input>
        <div className="flex flex-col gap-1">
          <Input
            {...register("password", {
              required: "Password is required.",
            })}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoFocus
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
          <NavLink
            to="/forgot-password"
            className="text-primary text-sm hover:underline w-max font-medium"
          >
            Forgot password?
          </NavLink>
        </div>
        <Button className="font-medium" disabled={isSubmitting}>
          Continue
        </Button>
      </form>
    </>
  );
}
