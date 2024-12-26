import type { ISale } from "@/types/Sales";
import React from "react";

interface SalesTableProps {
  sales: ISale[];
  error?: null | string;
  isLoading?: boolean;
}

export function SalesTable({ sales, error, isLoading }: SalesTableProps) {
  return (
    <>
      {isLoading && <div className="text-center">Carregando...</div>}

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
    </>
  );
}
