import { SocialPost } from "@/types/social";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, MessageSquare, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: SocialPost;
}

function formatDate(dateStr: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

const platformColors = {
  reddit: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  twitter: "bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300",
  linkedin: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={cn("text-xs", platformColors[post.platform])}
          >
            {post.subreddit ?? post.platform}
          </Badge>
          <span className="text-xs font-medium text-muted-foreground">
            {post.author}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="line-clamp-4 text-sm">{post.content}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-0">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {post.upvotes !== undefined && (
            <span className="flex items-center gap-1">
              <ArrowUp className="h-3 w-3" />
              {post.upvotes.toLocaleString()}
            </span>
          )}
          {post.comments !== undefined && (
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {post.comments.toLocaleString()}
            </span>
          )}
          <span>{formatDate(post.publishedAt)}</span>
        </div>
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          View
          <ExternalLink className="h-3 w-3" />
        </a>
      </CardFooter>
    </Card>
  );
}
