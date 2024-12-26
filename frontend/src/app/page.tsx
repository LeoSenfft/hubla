"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import { Button } from "@/components/ui/button";
import { useSales } from "./hooks/sales";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const { sales, isLoading: isSalesLoading, setSales, error } = useSales();

  const [form, setForm] = useState<{ file: File | null }>({ file: null });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.file) {
      return;
    }

    if (isLoading) {
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

        setSales(resp.data.data);
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

        {isSalesLoading && <div className="text-center">Carregando...</div>}

        {error && <div className="text-center text-red-500">{error}</div>}

        {sales && `Total de vendas: ${sales.length}`}

        <table className="mt-6 w-full table-auto border">
          <thead className="sticky top-0 bg-slate-200">
            <tr>
              <td className="uppercase font-bold p-4">Nome</td>
              <td className="uppercase font-bold p-4">Vendedor</td>
              <td className="uppercase font-bold p-4">Valor</td>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr
                className="py-4 pb-0 even:bg-slate-50 odd:bg-white"
                key={sale.id}
              >
                <td className="p-4">{sale.product.description}</td>
                <td className="p-4">{sale.user.name}</td>
                <td className="p-4">
                  {sale.value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
