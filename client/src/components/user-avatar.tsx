import { useRef, useState } from "react";
import { updateAvatar } from "@/lib/user";
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
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
    if (validImageTypes.includes(file.type)) {
      setPreview(URL.createObjectURL(file));
    } else {
      console.error("Please select a valid image file (JPEG, PNG, or WebP).");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    try {
      setIsSaving(true);
      await updateAvatar(file);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update avatar", error);
    } finally {
      setIsSaving(false);
    }
  };

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
          src={preview ?? avatar_url}
          alt={username}
          className="m-auto rounded-full size-60"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        <DialogFooter>
          {preview ? (
            <>
              <Button variant="outline" className="h-11" onClick={handleCancel}>
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
                onClick={handleChooseFile}
              >
                <Icons.pencil className="size-4" />
                Change
              </Button>
              <Button className="h-11 gap-2">
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
