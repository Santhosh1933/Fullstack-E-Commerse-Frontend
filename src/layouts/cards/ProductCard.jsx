import { Button } from "antd";
import React from "react";
import { CustomButton } from "../../components/CustomButton";
import { Price } from "../../components/Price";

export const ProductCard = (props) => {
  return (
    <div className=" w-full p-0 hover:shadow-md group border border-[#9d9b9b] h-[250px] sm:h-[250px]  cursor-pointer group  overflow-hidden bg-white ease-in-out duration-300 rounded-md">
      <div className="w-full overflow-hidden h-[70%] rounded-sm ">
        <img
          src={props?.product?.thumbnail}
          alt=""
          className=" ease-in-out duration-300 group-hover:scale-105 h-full object-cover w-full object-top"
        />
      </div>
      <div className="h-[30%] p-2">
        <p className="text-sm sm:text-md font-semibold line-clamp-2">
         {props?.product?.name}
        </p>
        <div className="flex gap-2">
          <Price className="text-[#fb8539]">{props?.product?.price}</Price>
        </div>
      </div>
    </div>
  );
};
