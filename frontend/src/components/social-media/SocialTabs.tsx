import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RedditFeed } from "./RedditFeed";

export function SocialTabs() {
  return (
    <Tabs defaultValue="reddit">
      <TabsList className="mb-6">
        <TabsTrigger value="reddit">Reddit</TabsTrigger>
      </TabsList>
      <TabsContent value="reddit">
        <RedditFeed />
      </TabsContent>
    </Tabs>
  );
}
