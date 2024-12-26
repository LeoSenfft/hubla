import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import type { IUser } from "@/types/User";
import { useToast } from "@/hooks/use-toast";

export function useUsers() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function main() {
      if (isLoading) {
        return;
      }

      setError(null);

      try {
        setIsLoading(true);
        const resp = await axiosInstance.get("/users");

        setUsers(resp.data.data ?? []);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Algo deu errado.",
          description: error.response.data.message,
        });
        setError(error.response.data.message);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    main();
  }, []);

  return { users, setUsers, isLoading, error };
}
