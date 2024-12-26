"use client";

import React from "react";
import { useUsers } from "../hooks/users";

export default function PageSaldos() {
  const { users, error, isLoading } = useUsers();

  return (
    <div className="PageSaldos">
      <div className="container">
        {isLoading && <div className="text-center">Carregando...</div>}

        {error && <div className="text-center text-red-500">{error}</div>}

        {users ? (
          <>
            <h2 className="mb-4">Lista de usuários:</h2>

            <table className="mt-6 w-full table-auto border">
              <thead className="sticky top-0 bg-slate-200">
                <tr>
                  <td className="uppercase font-bold p-4">Nome</td>
                  <td className="uppercase font-bold p-4">Saldo</td>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    className="py-4 pb-0 even:bg-slate-50 odd:bg-white"
                    key={user.id}
                  >
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">
                      {user.balance.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          "Nenhum usuário encontrado"
        )}
      </div>
    </div>
  );
}
