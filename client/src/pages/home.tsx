import { NavLink } from "react-router";
import { Icons } from "@/components/icons";
import LogoutBtn from "@/components/logout-btn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth";

export default function Home() {
  document.title = "Quibble Account";
  const { user } = useAuth();

  if (!user) return null;
  return (
    <div className="flex flex-col items-center mx-auto max-w-100">
      <Avatar className="size-25">
        <AvatarImage src={user.avatar_url ?? ""} />
        <AvatarFallback seed={user.username} />
      </Avatar>
      <h2 className="text-3xl font-medium mt-5 capitalize">
        {user.name ?? user.username}
      </h2>
      <span className="mt-1">{user.email}</span>
      <div className="flex items-center justify-between w-full mt-8">
        <a
          href="https://github.com/orgs/goquibble/discussions"
          target="_blank"
          rel="noreferrer"
          className="border border-border rounded-xl px-3 py-2 flex items-center gap-2 hover:bg-muted transition-colors"
        >
          <Icons.info className="text-muted-foreground size-4" />
          Need help?
        </a>
        <NavLink
          to="/password"
          className="border border-border rounded-xl px-3 py-2 flex items-center gap-2 hover:bg-muted transition-colors"
        >
          <Icons.password className="text-muted-foreground size-4" />
          My password
        </NavLink>
        <LogoutBtn />
      </div>
      <div className="mt-4 border border-border rounded-xl flex flex-col">
        <div className="flex items-center p-4 border-b border-border gap-4">
          <div className="flex flex-col">
            <h4 className="text-lg">Data & personalization</h4>
            <span className="text-sm text-muted-foreground">
              Info about you and your preferences across Quibble services
            </span>
          </div>
          <img
            src="/icons/data-and-personalization.png"
            alt="Data & personalization"
            className="size-16"
          />
        </div>
        <div className="p-4 hover:bg-muted transition-colors rounded-b-xl flex items-center">
          <NavLink to="/personal-info">Manage your personal info</NavLink>
          <Icons.arrowRight className="text-muted-foreground size-4 ml-auto" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-8 text-center">
        Only you can see your settings. <br />
        Quibble keeps your data private, safe, and secure.
      </p>
    </div>
  );
}
