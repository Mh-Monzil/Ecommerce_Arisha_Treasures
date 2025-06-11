import { RootState } from "@/app/store";
import React from "react";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (user.role === "admin") {
    return <div>{children}</div>;
  }
};

export default PrivateRoute;
