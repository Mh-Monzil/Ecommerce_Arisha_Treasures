"use client";

import type React from "react";

import { CartProvider } from "@/components/cart/CartProvider";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CartProvider>{children}</CartProvider>;
}
