"use client";

import type { IUser } from "@/types/User";
import { createContext, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import { setCookie, deleteCookie, hasCookie } from "cookies-next";
import { AxiosResponse } from "axios";
import { toast } from "@/hooks/use-toast";
import { getUserByToken } from "@/services/auth/user";
import { useRouter } from "next/navigation";

type AuthContext = {
  currentUser: IUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  isLoading: boolean;
  error: string | null;
  signIn: (payload: { name: string; password: string }) => any;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function main() {
      if (!currentUser && hasCookie("token")) {
        const resp = await getUserByToken();

        if (resp.data?.user) {
          setCurrentUser(resp.data.user);
        } else {
          signOut();
        }
      }
    }

    main();
  }, []);

  async function signIn(payload: { name: string; password: string }) {
    if (isLoading) {
      return;
    }

    setError(null);

    try {
      setIsLoading(true);
      const resp: AxiosResponse = await axiosInstance.post(
        "/auth/login",
        payload
      );

      setCookie("token", resp?.data?.token);
      setCurrentUser(resp?.data?.user);

      return { success: true };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Algo deu errado.",
        description: error.response.data.message,
      });

      setError(error.response.data.message);
      setCurrentUser(null);

      console.error(error);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }

  function signOut() {
    deleteCookie("token");
    setCurrentUser(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, isLoading, error, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
