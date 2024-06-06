import { Skeleton } from "antd";
import React from "react";

export const CartPageSkeleton = () => {
  return (
    <div>
      <div className="container py-10">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Skeleton.Image
              active={true}
              style={{ width: "100%", height: "200px" }}
            ></Skeleton.Image>
            <Skeleton.Image
              active={true}
              style={{ width: "100%", height: "200px" }}
            ></Skeleton.Image>

          </div>
          <Skeleton
            active
            paragraph={{
              rows: 8,
            }}
          />
        </div>
      </div>
    </div>
  );
};
