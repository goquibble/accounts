import DiscordIcon from "@/components/icons/discord";
import GoogleIcon from "@/components/icons/google";
import Button from "@/components/ui/button";

interface OAuthBtnsProps {
  disabled: boolean;
}

export default function OAuthBtns({ disabled }: OAuthBtnsProps) {
  return (
    <div className="space-y-3 w-full">
      <Button variant="outline" className="justify-start" disabled={disabled}>
        <GoogleIcon className="size-5" />
        Continue with Google
      </Button>
      <Button variant="outline" className="justify-start" disabled>
        <DiscordIcon className="size-5" />
        Continue with Discord
      </Button>
    </div>
  );
}
