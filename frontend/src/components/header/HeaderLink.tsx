import Link, { type LinkProps } from "next/link";
import React from "react";

interface HeaderLinkProps extends LinkProps {
  children: React.ReactNode;
}

export function HeaderLink({ children, ...props }: HeaderLinkProps) {
  return (
    <Link {...props} className="">
      {children}
    </Link>
  );
}
