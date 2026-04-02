"use client";

import { getUser } from "./auth";

export const protectRoute = (role?: string) => {
  const user: any = getUser();

  if (!user) {
    window.location.href = "/login";
    return;
  }

  if (role && user.role !== role) {
    window.location.href = "/";
  }
};