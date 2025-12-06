import * as AvatarPrimitive from "@radix-ui/react-avatar";
import type * as React from "react";

import { cn, getAvatarUrl } from "@/lib/utils";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn("flex size-8 shrink-0", className)}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full rounded-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  seed,
  format,
  size,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> & {
  seed?: string;
  format?: "svg" | "png";
  size?: number;
}) {
  const avatarUrl = getAvatarUrl(seed, format, size);
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("flex size-full", className)}
      {...props}
    >
      <img src={avatarUrl} alt={`avatar-${seed}`} />
    </AvatarPrimitive.Fallback>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
