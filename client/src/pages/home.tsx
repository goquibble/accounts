import { NavLink } from "react-router";
import GridItem from "@/components/grid-item";
import { Icons } from "@/components/icons";
import LogoutBtn from "@/components/logout-btn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth";

export default function Home() {
  document.title = "Quibble Account";
  const { user } = useAuth();

  if (!user) return null;
  return (
    <div className="flex flex-col items-center">
      <Avatar className="size-25">
        <AvatarImage src={user.avatar_url ?? ""} />
        <AvatarFallback seed={user.username} />
      </Avatar>
      <h2 className="text-3xl font-medium mt-5">Welcome, {user.username}!</h2>
      <span className="mt-2 text-muted-foreground">
        Manage your account to make GoQuibble work better for you.
      </span>
      <div className="flex items-center gap-4 mt-8">
        <a
          href="https://github.com/orgs/goquibble/discussions"
          target="_blank"
          rel="noreferrer"
          className="border border-border rounded-xl px-3 py-2 flex items-center gap-2 hover:bg-input/25 transition-colors"
        >
          <Icons.info className="text-muted-foreground size-4" />
          Need help?
        </a>
        <NavLink
          to="/password"
          className="border border-border rounded-xl px-3 py-2 flex items-center gap-2 hover:bg-input/25 transition-colors"
        >
          <Icons.password className="text-muted-foreground size-4" />
          My password
        </NavLink>
        <LogoutBtn />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4 w-full">
        <GridItem
          title="Connected Apps"
          subTitle="GoQuibble apps that are connected to this account."
          imageSrc="/icons/connected-apps.png"
          iconClassName="-rotate-45"
        >
          <a
            href="http://goquibble.online"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2"
          >
            <img src="/favicon.svg" alt="Quibble" className="size-6" />
            <span>Quibble</span>
          </a>
        </GridItem>
        <GridItem
          title="Data & personalization"
          subTitle="Info about you and your preferences across GoQuibble services"
          imageSrc="/icons/data-and-personalization.png"
        >
          <NavLink to="/personal-info">Manage your personal info</NavLink>
        </GridItem>
      </div>
      <p className="text-sm text-muted-foreground mt-8 text-center">
        Only you can see your settings. <br />
        GoQuibble keeps your data private, safe, and secure.
      </p>
    </div>
  );
}
