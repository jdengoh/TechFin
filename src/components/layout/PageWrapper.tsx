import { cn } from "@/lib/utils";

interface PageWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ title, description, children, className }: PageWrapperProps) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className={cn(className)}>{children}</div>
    </main>
  );
}
