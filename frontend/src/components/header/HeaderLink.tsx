import Link, { type LinkProps } from "next/link";
import React from "react";

import { twMerge } from "tailwind-merge";

interface HeaderLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export function HeaderLink({ children, className, ...props }: HeaderLinkProps) {
  return (
    <Link
      {...props}
      className={twMerge("px-4 hover:underline underline-offset-2", className)}
    >
      {children}
    </Link>
  );
}
