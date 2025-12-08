import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Icons } from "@/components/icons";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useAuth } from "@/contexts/auth";
import { updateUser } from "@/lib/user";

export default function PersonalInfoName() {
  document.title = "Name";
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name ?? "");

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess(updatedUser) {
      setUser(updatedUser);
      navigate(-1);
    },
  });

  function handleSave() {
    if (name !== user?.name) {
      mutation.mutate({ name });
    }
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 mx-auto max-w-125 w-full">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="size-8 grid place-items-center hover:bg-muted transition-colors rounded-full border border-border"
          onClick={() => navigate(-1)}
        >
          <Icons.arrowRight className="-rotate-180 size-5 text-muted-foreground" />
        </button>
        <h1 className="text-3xl font-medium">Name</h1>
      </div>
      <p className="text-muted-foreground text-sm">
        Changes to your name will be reflected across your Quibble Account. Your
        previous name may still be searchable or appear on old messages.
      </p>
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex flex-col gap-2">
        <span className="font-medium">Who can you see your name</span>
        <div className="flex gap-2">
          <Icons.users className="size-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Anyone can see this info when they communicate with you or view
            content you create in Quibble services.
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" className="h-11" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button
          className="h-11"
          disabled={(user.name ?? "") === name || mutation.isPending}
          onClick={handleSave}
        >
          {mutation.isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
