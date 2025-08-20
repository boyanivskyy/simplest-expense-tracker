import * as React from "react";
import { cn } from "@/lib/utils";

export function Separator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      className={cn("shrink-0 bg-foreground/10 h-px w-full", className)}
      {...props}
    />
  );
}

