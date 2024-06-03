import { Empty, Skeleton } from "antd";
import React from "react";

export const ProductCardSkeleton = () => {
  return (
    <div className="w-full border border-[#9d9b9b] h-[250px] sm:h-[250px] cursor-pointer  bg-white rounded-md">
      <div className="w-full h-[70%] flex justify-center items-center">
        <Empty/>
      </div>
      <div className="h-[30%] p-2 sm:p-4">
        <Skeleton
          active={true}
          title={false}
          paragraph={{ rows: 1, width: ["100%", "80%"] }}
        />
        <Skeleton
          active={true}
          title={false}
          paragraph={{ rows: 1, width: ["80%", "80%"] }}
          style={{ paddingTop: 8 }}
        />
      </div>
    </div>
  );
};
