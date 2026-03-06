import { PageWrapper } from "@/components/layout/PageWrapper";
import { SocialTabs } from "@/components/social-media/SocialTabs";

export function SocialMediaPage() {
  return (
    <PageWrapper
      title="Social Media"
      description="Community discussions from Reddit, Twitter, and LinkedIn"
    >
      <SocialTabs />
    </PageWrapper>
  );
}
