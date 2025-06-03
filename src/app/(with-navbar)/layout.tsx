"use client";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { store } from "@/app/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </Provider>
  );
};

export default CommonLayout;
