import type { ISale } from "@/types/Sales";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";

export function useSales() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sales, setSales] = useState<Array<ISale>>([]);

  useEffect(() => {
    async function main() {
      try {
        setIsLoading(true);
        const resp = await axiosInstance.get("/");

        setSales(resp.data.data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    main();
  }, []);

  return { sales, setSales, isLoading };
}
