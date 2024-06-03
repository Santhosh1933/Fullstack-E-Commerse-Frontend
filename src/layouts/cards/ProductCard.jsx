import { Button } from "antd";
import React from "react";
import { CustomButton } from "../../components/CustomButton";
import { Price } from "../../components/Price";

export const ProductCard = (props) => {
  return (
    <div className=" w-full p-0 hover:shadow-md group border border-[#9d9b9b] h-[250px] sm:h-[250px]  cursor-pointer group  overflow-hidden bg-white ease-in-out duration-300 rounded-md">
      <div className="w-full overflow-hidden h-[70%] rounded-sm ">
        <img
          src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/29546310/2024/5/15/7ae876c5-171b-4806-b33f-13c6829d301b1715792261671SportswearbyPUMAMensGraphicTee1.jpg"
          alt=""
          className=" ease-in-out duration-300 group-hover:scale-105 h-full object-cover w-full object-top"
        />
      </div>
      <div className="h-[30%] p-2">
        <p className="text-sm sm:text-md font-semibold line-clamp-2">
          Men's Casual Denim Jeans
        </p>
        <div className="flex gap-2">
          <Price className="text-[#fb8539]">300</Price>
        </div>
      </div>
    </div>
  );
};
