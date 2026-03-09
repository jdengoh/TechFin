import { PageWrapper } from "@/components/layout/PageWrapper";
import { EventsTabs } from "@/components/events/EventsTabs";

export function EventsPage() {
  return (
    <PageWrapper
      title="World Events"
      description="Financial market impact of major global events"
    >
      <EventsTabs />
    </PageWrapper>
  );
}
