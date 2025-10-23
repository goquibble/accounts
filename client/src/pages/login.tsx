import { NavLink } from "react-router";
import DiscordIcon from "@/components/icons/discord";
import GoogleIcon from "@/components/icons/google";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function Login() {
  document.title = "Login — GoQuibble";

  return (
    <main className="max-w-90 mx-auto p-4 pt-14 flex flex-col items-center gap-4">
      <img src="/favicon.svg" alt="Quibble" className="size-10" />
      <h1 className="text-3xl font-medium">Welcome back</h1>
      <form className="space-y-4 w-full">
        <Input type="email" name="email" placeholder="Email address" />
        <Button className="font-medium">Continue</Button>
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
      <Button variant="outline" className="justify-start">
        <GoogleIcon className="size-5" />
        Continue with Google
      </Button>
      <Button variant="outline" className="justify-start" disabled>
        <DiscordIcon className="size-5" />
        Continue with Discord
      </Button>
      <div className="flex items-center gap-2">
        <a
          href="https://legal.goquibble.online/terms-of-use"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted-foreground underline"
        >
          Terms of Use
        </a>
        <span className="text-muted-foreground text-sm">—</span>
        <a
          href="https://legal.goquibble.online/privacy-policy"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted-foreground underline"
        >
          Privacy Policy
        </a>
      </div>
    </main>
  );
}
