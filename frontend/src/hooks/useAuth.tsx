"use client";

import { AuthContext } from "@/contexts/authContext";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext precisa ser usado com AuthContextProvider");
  }

  return context;
}
