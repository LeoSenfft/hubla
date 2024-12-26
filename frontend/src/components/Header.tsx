import Link from "next/link";
import React from "react";
import { HeaderLink } from "./header/HeaderLink";

export function Header() {
  return (
    <header className="py-6 bg-slate-600 text-white">
      <div className="container">
        <nav className="flex justify-center">
          <HeaderLink href={"/"}>Home</HeaderLink>
          <HeaderLink href={"/saldos"}>Saldos</HeaderLink>
        </nav>
      </div>
    </header>
  );
}
