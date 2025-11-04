import { NavLink } from "react-router";
import GridItem from "@/components/grid-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth";

export default function Home() {
  const { user } = useAuth();
  document.title = `${user?.name ?? user?.username} — GoQuibble`;

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
      <div className="grid grid-cols-2 gap-4 mt-8 w-full">
        <GridItem
          title="Connected Apps"
          subTitle="GoQuibble apps that are connected to this account."
          imageSrc="/icons/connected-apps.png"
        >
          <a
            href="http://goquibble.online"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2"
          >
            <img src="/favicon.svg" alt="Quibble" className="size-6" />
            <span className="font-medium text-muted-foreground">Quibble</span>
          </a>
        </GridItem>
        <GridItem
          title="Data & personalization"
          subTitle="Info about you and your preferences across GoQuibble services"
          imageSrc="/icons/data-and-personalization.png"
        >
          <NavLink
            to="/personal-info"
            className="font-medium text-muted-foreground"
          >
            Manage your personal info
          </NavLink>
        </GridItem>
      </div>
    </div>
  );
}
