import { Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export const CategoryListingCard = (props) => {
  const navigate = useNavigate()
  return (
    <div className="min-w-[200px] w-[200px] relative group min-h-[200px] h-[200px] object-cover rounded-full overflow-hidden cursor-pointer">
      <div className="absolute bg-[#000] h-full w-full opacity-0 group-hover:opacity-60  ease-in-out duration-300" />
      <div className="absolute translate-center  ease-in-out duration-300 opacity-0 group-hover:opacity-100 w-full text-center">
        <Typography.Title level={5}>
          <p className="text-white line-clamp-2">{props.category.name}</p>
        </Typography.Title>
        <p  onClick={() => {
            navigate(`/products?category=${props.category.name}`);
          }} className="text-orange hover:underline underline-offset-2">
          Explore
        </p>
      </div>
      <img
        src={props.category.thumbnail}
        alt=""
        className="w-full h-full object-cover object-top"
      />
    </div>
  );
};
