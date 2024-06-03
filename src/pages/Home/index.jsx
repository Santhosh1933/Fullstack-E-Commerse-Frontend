import React from "react";
import { Banner } from "./Banner";
import { TopProducts } from "./TopProducts";
import { CategoryListing } from "./CategoryListing";
import { TempProducts } from "./TempProducts";

export const HomeIndex = () => {

  return (
    <div>
      <div className="pt-[13vh]"></div>
      <Banner/>
      <TopProducts/>
      <CategoryListing/>
      <TempProducts/>
    </div>
  );
};
