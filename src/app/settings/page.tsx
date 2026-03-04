import { PageWrapper } from "@/components/layout/PageWrapper";
import { HoldingsList } from "@/components/settings/HoldingsList";

export default function SettingsPage() {
  return (
    <PageWrapper
      title="Settings"
      description="Manage your portfolio holdings"
    >
      <HoldingsList />
    </PageWrapper>
  );
}
