import React from "react";
import { Banner } from "./Banner";
import { TopProducts } from "./TopProducts";

export const HomeIndex = () => {

  return (
    <div>
      <div className="pt-[13vh]"></div>
      <Banner/>
      <TopProducts/>
    </div>
  );
};
