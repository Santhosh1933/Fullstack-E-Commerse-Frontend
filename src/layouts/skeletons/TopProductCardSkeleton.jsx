import { Skeleton } from "antd";
import React from "react";

export const TopProductCardSkeleton = () => {
  return (
    <Skeleton.Image
      active={true}
      style={{ width: "100%", height: "300px" }}
    ></Skeleton.Image>
  );
};
