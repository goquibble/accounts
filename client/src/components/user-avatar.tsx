import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { updateUser } from "@/lib/user";
import { Icons } from "./icons";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
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
  avatar_url: string | null;
  username: string;
}

export default function UserAvatar({ avatar_url, username }: UserAvatarProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(avatar_url);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (open) setAvatarUrl(avatar_url);
  }, [open, avatar_url]);

  const cleanup = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
    if (validImageTypes.includes(file.type)) {
      setPreview(URL.createObjectURL(file));
    } else {
      cleanup();
    }
  };

  const handleSave = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    try {
      setIsSaving(true);
      const newUser = await updateUser({ avatar: file });
      queryClient.setQueryData(["user"], () => ({
        ...newUser, // update avatar url to remove browser cache
        avatar_url: `${newUser.avatar_url}?t=${Date.now()}`,
      }));
      setOpen(false);
      setTimeout(() => cleanup(), 200);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemove = async () => {
    try {
      setIsSaving(true);
      await updateUser({ delete_avatar: true });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setOpen(false);
      setTimeout(() => {
        cleanup();
        setShowRemoveConfirm(false);
      }, 200);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const title = showRemoveConfirm
    ? "Remove profile picture?"
    : "Profile picture";

  const description = showRemoveConfirm
    ? "Your profile picture will be removed and a default image will be used instead."
    : "A picture helps people recognize you and lets you know when you're signed in to your account.";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="relative">
        <Avatar className="size-25">
          {avatar_url && <AvatarImage src={avatar_url} />}
          <AvatarFallback seed={username} />
        </Avatar>
        <Icons.camera className="absolute bottom-0 right-0 bg-muted rounded-full size-7 p-1" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {showRemoveConfirm ? (
          <div className="flex items-center justify-center gap-4">
            <Avatar className="size-30">
              {avatarUrl && <AvatarImage src={avatarUrl} />}
              <AvatarFallback seed={username} />
            </Avatar>
            <Icons.arrowRight className="size-6" />
            <Avatar className="size-30">
              <AvatarFallback seed={username} />
            </Avatar>
          </div>
        ) : (
          <>
            <Avatar className="m-auto rounded-full size-60">
              {avatar_url && <AvatarImage src={preview ?? avatar_url} />}
              <AvatarFallback seed={username} />
            </Avatar>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
            />
            {preview && (
              <Alert>
                <Icons.info />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  It may take a moment to see the change across all your Quibble
                  services.
                </AlertDescription>
              </Alert>
            )}
          </>
        )}
        <DialogFooter>
          {showRemoveConfirm ? (
            <>
              <Button
                variant="outline"
                className="h-11"
                onClick={() => setShowRemoveConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                className="h-11 gap-2"
                onClick={handleRemove}
                disabled={isSaving}
              >
                {isSaving ? "Removing..." : "Remove"}
              </Button>
            </>
          ) : preview ? (
            <>
              <Button variant="outline" className="h-11" onClick={cleanup}>
                Cancel
              </Button>
              <Button
                className="h-11 gap-2"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  "Saving..."
                ) : (
                  <>
                    <Icons.save className="size-4" />
                    Save
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="h-11 gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Icons.pencil className="size-4" />
                Change
              </Button>
              <Button
                className="h-11 gap-2"
                onClick={() => setShowRemoveConfirm(true)}
                disabled={avatar_url === null}
              >
                <Icons.trash className="size-4" />
                Remove
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
