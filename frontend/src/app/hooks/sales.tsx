import type { ISale } from "@/types/Sales";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import { useToast } from "@/hooks/use-toast";

export function useSales() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sales, setSales] = useState<Array<ISale>>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function main() {
      if (isLoading) {
        return;
      }

      setError(null);

      try {
        setIsLoading(true);
        const resp = await axiosInstance.get("/");

        setSales(resp.data.data ?? []);
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

  return { sales, setSales, isLoading, error };
}
