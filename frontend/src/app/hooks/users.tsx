import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import type { IUser } from "@/types/User";

export function useUsers() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<IUser>>([]);

  useEffect(() => {
    async function main() {
      try {
        setIsLoading(true);
        const resp = await axiosInstance.get("/users");

        setUsers(resp.data.data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    main();
  }, []);

  return { users, setUsers, isLoading };
}
