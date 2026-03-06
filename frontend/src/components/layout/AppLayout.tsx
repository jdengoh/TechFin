import { Outlet } from "react-router-dom";
import { TopNav } from "./TopNav";
import { FirstLoginDialog } from "@/components/onboarding/FirstLoginDialog";

export function AppLayout() {
  return (
    <>
      <TopNav />
      <FirstLoginDialog />
      <Outlet />
    </>
  );
}
