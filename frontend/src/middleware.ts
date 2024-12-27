"use server";

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let token = request.cookies.get("token");

  try {
    const resp = await fetch(`http://backend:5000/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    const data = await resp.json();

    if (data.error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/saldos", "/"],
};
