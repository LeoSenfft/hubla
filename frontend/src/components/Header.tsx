"use client";

import React from "react";
import { HeaderLink } from "./header/HeaderLink";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const { signOut, currentUser } = useAuth();

  function handleSignOut(e: React.MouseEvent) {
    e.preventDefault();

    signOut();
  }

  return (
    <header className="py-6 bg-slate-600 text-white">
      <div className="container">
        <nav className="flex justify-center">
          <HeaderLink href={"/"}>Home</HeaderLink>
          <HeaderLink href={"/saldos"}>Saldos</HeaderLink>

          {currentUser ? (
            <HeaderLink href={"/login"} onClick={handleSignOut}>
              Sair
            </HeaderLink>
          ) : (
            <HeaderLink href={"/login"}>Entrar</HeaderLink>
          )}
        </nav>
      </div>
    </header>
  );
}
