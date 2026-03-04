"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RedditFeed } from "./RedditFeed";
import { TwitterFeed } from "./TwitterFeed";
import { LinkedInFeed } from "./LinkedInFeed";

export function SocialTabs() {
  return (
    <Tabs defaultValue="reddit">
      <TabsList className="mb-6">
        <TabsTrigger value="reddit">Reddit</TabsTrigger>
        <TabsTrigger value="twitter">Twitter / X</TabsTrigger>
        <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
      </TabsList>
      <TabsContent value="reddit">
        <RedditFeed />
      </TabsContent>
      <TabsContent value="twitter">
        <TwitterFeed />
      </TabsContent>
      <TabsContent value="linkedin">
        <LinkedInFeed />
      </TabsContent>
    </Tabs>
  );
}
