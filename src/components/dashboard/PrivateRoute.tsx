import { RootState } from "@/app/store";
import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    redirect("/");
    return null;
  }

  if (user.role === "admin") {
    return <div>{children}</div>;
  }
};

export default PrivateRoute;
