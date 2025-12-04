import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { logOut } from "@/lib/auth";
import { Icons } from "./icons";
import Button from "./ui/button";

export default function LogoutBtn() {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogOut = async () => {
    try {
      setLoggingOut(true);
      await logOut();
      // redirect with refresh states
      window.location.replace("/log-in");
    } catch (err) {
      console.error(err);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="border border-border rounded-xl px-3 py-2 flex items-center gap-2 hover:bg-muted transition-colors">
        <Icons.logout className="text-muted-foreground size-4" />
        Log out
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Log out</DialogTitle>
          <DialogDescription>
            You are about to log out of your account. Any unsaved changes will
            be lost. Are you sure you want to continue?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="h-11">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="h-11 gap-2"
            onClick={handleLogOut}
            disabled={loggingOut}
          >
            <Icons.logout className="size-4" />
            Log out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
