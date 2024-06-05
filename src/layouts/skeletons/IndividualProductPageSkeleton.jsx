import { Skeleton } from "antd";
import React from "react";

export const IndividualProductPageSkeleton = () => {

  return (
    <div>
      <div className="container py-10">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <Skeleton.Image
            active={true}
            style={{ width: "100%", height: "300px" }}
          ></Skeleton.Image>
          <Skeleton
            active
            paragraph={{
              rows: 8,
            }}
          />
        </div>
        <div className="py-4"></div>
        <hr className="pt-4 text-[#ebebeb]" />
        <div className="py-4">
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
