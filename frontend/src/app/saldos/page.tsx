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
          <div className="grid grid-cols-cards gap-6">
            {users.map((user) => (
              <div className="bg-slate-500 text-white p-4" key={user.id}>
                Nome: {user.name} <br />
                Saldo:{" "}
                {user.balance.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
            ))}
          </div>
        ) : (
          "Nenhum usuário encontrado"
        )}
      </div>
    </div>
  );
}
