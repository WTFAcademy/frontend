import { cn } from "@site/src/utils/class-utils";
import React from "react";

export function IconCopy({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z" />
    </svg>
  );
}

export function IconCheck({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  );
}

export function IconDownload({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M224 152v56a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16v-56a8 8 0 0 1 16 0v56h160v-56a8 8 0 0 1 16 0Zm-101.66 5.66a8 8 0 0 0 11.32 0l40-40a8 8 0 0 0-11.32-11.32L136 132.69V40a8 8 0 0 0-16 0v92.69l-26.34-26.35a8 8 0 0 0-11.32 11.32Z" />
    </svg>
  );
}
