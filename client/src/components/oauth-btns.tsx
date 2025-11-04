import Button from "@/components/ui/button";
import { Icons } from "./icons";

interface OAuthBtnsProps {
  disabled: boolean;
}

export default function OAuthBtns({ disabled }: OAuthBtnsProps) {
  return (
    <div className="space-y-3 w-full">
      <Button variant="outline" className="justify-start" disabled={disabled}>
        <Icons.google className="size-5" />
        Continue with Google
      </Button>
      <Button variant="outline" className="justify-start" disabled>
        <Icons.discord className="size-5" />
        Continue with Discord
      </Button>
    </div>
  );
}
