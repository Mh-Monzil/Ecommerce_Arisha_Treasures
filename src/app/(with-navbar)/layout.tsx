"use client";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { store } from "@/app/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { CartProvider } from "@/components/cart/CartProvider";
import CartSidebar from "@/components/cart/CartSidebar";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <CartProvider>
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <CartSidebar />
        <Footer />
      </CartProvider>
    </Provider>
  );
};

export default CommonLayout;
