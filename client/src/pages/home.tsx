import { tokenStore } from "@/lib/token-store";

export default function Home() {
  return <span>{tokenStore.get()}</span>;
}
