"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import { Button } from "@/components/ui/button";
import { useSales } from "@/hooks/sales";
import { useToast } from "@/hooks/use-toast";
import { SalesTable } from "@/components/SalesTable";

export default function Home() {
  const { toast } = useToast();
  const { sales, isLoading: isSalesLoading, setSales, error } = useSales();

  const [form, setForm] = useState<{ file: File | null }>({ file: null });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    if (!form.file) {
      toast({
        title: "Adicione um arquivo primeiro!",
      });

      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", form.file);

      setIsLoading(true);

      const resp = await axiosInstance.post("/", formData);

      if (resp.data.data) {
        toast({
          title: "Sucesso!",
          description: resp.data.message,
        });

        setSales((previous) => [...previous, ...resp.data.data]);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Algo deu errado.",
        description: error.response.data.message,
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="Home">
      <div className="container">
        <form className="max-w-80 mx-auto" onSubmit={handleSubmit}>
          <Label htmlFor="picture">Arquivo das transações</Label>
          <Input
            id="picture"
            type="file"
            onChange={(e) =>
              setForm({
                ...form,
                file: e.target.files ? e.target.files[0] : null,
              })
            }
          />

          <Button className="mt-4" type="submit">
            {isLoading ? "..." : "Importar"}
          </Button>
        </form>

        <SalesTable sales={sales} isLoading={isSalesLoading} error={error} />
      </div>
    </div>
  );
}
