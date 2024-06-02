import React, { Children } from "react";

export const TopProductLayout = ({ children }) => {
  return <div className="grid gap-4 grid-cols-1 min-[425px]:grid-cols-2 md:grid-cols-3">{children}</div>;
};
