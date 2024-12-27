"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface loginForm {
  name: string;
  password: string;
}

export default function PageLogin() {
  const { signIn, isLoading } = useAuth();

  const [form, setForm] = useState<loginForm>({ name: "", password: "" });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const resp = await signIn(form);

    if (resp?.success) {
      router.push("/");
    }
  }

  return (
    <div className="PageLogin">
      <div className="container max-w-80">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>

          <Button className="w-fit" type="submit">
            {isLoading ? "..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
