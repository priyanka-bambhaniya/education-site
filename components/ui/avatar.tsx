import * as React from "react";
import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100",
        className,
      )}
      {...props}
    />
  ),
);
Avatar.displayName = "Avatar";

type AvatarImageProps = Omit<ImageProps, "width" | "height" | "alt"> & {
  size?: number;
  alt?: string;
};

function AvatarImage({ className, alt = "", size = 40, ...props }: AvatarImageProps) {
  return (
    <Image
      width={size}
      height={size}
      alt={alt}
      className={cn("h-full w-full object-cover", className)}
      {...props}
    />
  );
}

const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("text-xs font-semibold uppercase text-slate-600", className)}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
