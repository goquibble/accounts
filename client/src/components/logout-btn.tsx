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
import { Icons } from "./icons";
import Button from "./ui/button";

export default function LogoutBtn() {
  return (
    <Dialog>
      <DialogTrigger className="border border-border rounded-xl px-3 py-2 flex items-center gap-2 hover:bg-input/25 transition-colors">
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
          <Button className="h-11 gap-2">
            <Icons.logout className="size-4" />
            Log out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
