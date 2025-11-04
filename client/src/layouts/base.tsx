import { Outlet } from "react-router";
import Header from "@/components/header";

export default function BaseLayout() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}
