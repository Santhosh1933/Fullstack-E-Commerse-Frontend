import React from "react";
import { useLocation } from "react-router-dom";
import { IndividualProductPageSkeleton } from "../../layouts/skeletons/IndividualProductPageSkeleton";
import { IndividualProduct } from "./IndividualProduct";

export const IndividualProducts = () => {

  return (
    <div>
      <div className="pt-[13vh]"></div>
      <IndividualProduct/>
    </div>
  );
};
