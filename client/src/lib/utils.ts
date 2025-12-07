import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getAvatarUrl(
  seed?: string,
  format: "svg" | "png" = "png",
  size: number = 300,
): string {
  const url = import.meta.env.VITE_PUBLIC_AVATARS_API_URL;
  const baseUrl = new URL(`${url}/1.x/avatar/${format}`);

  if (seed) baseUrl.searchParams.set("seed", seed);
  baseUrl.searchParams.set("size", size.toString());
  return baseUrl.toString();
}

export function formatTimestamp(input: string): string {
  const date = new Date(input);
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatter.format(date);
}
