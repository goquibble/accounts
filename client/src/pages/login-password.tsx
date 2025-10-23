import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { Icons } from "@/components/icons";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function LoginPassword() {
  document.title = "Log in — GoQuibble";

  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <h1 className="text-3xl font-medium">Enter Password</h1>
      <form className="space-y-3 w-full">
        <Input
          name="email"
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
          <NavLink
            to="/forgot-password"
            className="text-primary text-sm hover:underline w-max font-medium"
          >
            Forgot password?
          </NavLink>
        </div>
        <Button className="font-medium">Continue</Button>
      </form>
    </>
  );
}
