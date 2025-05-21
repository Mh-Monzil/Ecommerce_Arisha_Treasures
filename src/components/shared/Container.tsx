import { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`max-w-[1440px] mx-auto ${className}`}>{children}</div>
  );
};

export default Container;
