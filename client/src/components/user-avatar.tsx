import { Icons } from "./icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  avatar_url: string | null;
  username: string;
}

export default function UserAvatar({ avatar_url, username }: UserAvatarProps) {
  return (
    <div className="relative">
      <Avatar className="size-25">
        <AvatarImage src={avatar_url ?? ""} />
        <AvatarFallback seed={username} />
      </Avatar>
      <Icons.camera className="absolute bottom-0 right-0 bg-muted rounded-full size-7 p-1" />
    </div>
  );
}
