import { Icons } from "./icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Button from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface UserAvatarProps {
  avatar_url: string;
  username: string;
}

export default function UserAvatar({ avatar_url, username }: UserAvatarProps) {
  return (
    <Dialog>
      <DialogTrigger className="relative">
        <Avatar className="size-25">
          <AvatarImage src={avatar_url} />
          <AvatarFallback seed={username} />
        </Avatar>
        <Icons.camera className="absolute bottom-0 right-0 bg-muted rounded-full size-7 p-1" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile picture</DialogTitle>
          <DialogDescription>
            A picture helps people recognize you and lets you know when you’re
            signed in to your account
          </DialogDescription>
        </DialogHeader>
        <img
          src={avatar_url}
          alt={username}
          className="m-auto rounded-full size-60"
        />
        <DialogFooter>
          <Button variant="outline" className="h-11 gap-2">
            <Icons.pencil className="size-4" />
            Change
          </Button>
          <Button className="h-11 gap-2">
            <Icons.trash className="size-4" />
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
