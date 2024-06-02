import { Skeleton } from "antd";
import React from "react";

export const CategoryListingCardSkeleton = () => {
  return (
    <div>
      <Skeleton.Avatar
        active={true}
        style={{ width: "200px", height: "200px" }}
      />
    </div>
  );
};
