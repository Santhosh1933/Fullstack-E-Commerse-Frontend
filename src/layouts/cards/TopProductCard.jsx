import { Button, Typography } from "antd";
import React from "react";

export const TopProductCard = (props) => {
  console.log();
  return (
    <div className="w-full h-[300px] cursor-pointer group relative overflow-hidden bg-white ease-in-out duration-300 rounded-md">
      <div className="absolute bg-[#000] h-full w-full opacity-0 group-hover:opacity-60  ease-in-out duration-300" />
      <div className="absolute -bottom-[100%] w-full  opacity-0 group-hover:opacity-100 group-hover:bottom-0  ease-in-out duration-300  p-4">
        <Typography.Title level={5}>
          <p className="text-white line-clamp-2">{props.product.name}</p>
        </Typography.Title>
        <div className="flex justify-end">
          <p className="text-orange hover:underline underline-offset-2">
            View{" "}
          </p>
        </div>
      </div>
      <img
        src={props.product.thumbnail}
        alt=""
        className="w-full h-full object-cover object-top"
      />
    </div>
  );
};
