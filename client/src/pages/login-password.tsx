import { NavLink, useLocation } from "react-router";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function LoginPassword() {
  document.title = "Log in — GoQuibble";
  const location = useLocation();

  return (
    <>
      <img src="/favicon.svg" alt="Quibble" className="size-10" />
      <h1 className="text-3xl font-medium">Enter Password</h1>
      <form className="space-y-4 w-full">
        <Input
          name="email"
          type="email"
          placeholder="Email address"
          autoComplete="off"
          defaultValue={location.state.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          autoFocus
        />
        <Button className="font-medium">Continue</Button>
      </form>
      <NavLink to="/forgot-password" className="text-primary hover:underline">
        Forgot Password?
      </NavLink>
    </>
  );
}
