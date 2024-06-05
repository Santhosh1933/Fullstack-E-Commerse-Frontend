import { GetProductById } from "../../../Api";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { IndividualProductPageSkeleton } from "../../layouts/skeletons/IndividualProductPageSkeleton";
import { useEffect, useState } from "react";
import { Typography } from "antd";
import { Price } from "../../components/Price";

export const IndividualProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productId = location.pathname.split("/")[3];
  const [activeImage, setActiveImage] = useState("");
  const [images, setImages] = useState([]);
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["Product", { productId: productId }],
    queryFn: GetProductById,
  });

  if (isError) {
    navigate("/products");
    return null;
  }

  useEffect(() => {
    if (data) {
      console.log(data.product);
      setActiveImage(data?.product?.thumbnail);
      setImages([data?.product?.thumbnail, ...data?.product?.images]);
    }
  }, [data]);

  return (
    <div>
      {isLoading ? (
        <IndividualProductPageSkeleton />
      ) : (
        <div className="container py-4 sm:py-10">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div>
              <img
                src={activeImage}
                alt=""
                className=" h-3/4 sm:h-2/4 object-cover w-full object-top"
              />
              <div className="h-1/4 py-1 w-full grid grid-flow-col  overflow-x-scroll rm-scrollbar gap-1">
                {images?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt=""
                    className="h-full object-cover cursor-pointer"
                    onClick={() => {
                      setActiveImage(image);
                    }}
                  />
                ))}
              </div>
            </div>

            <div>
              <Typography.Title level={2} className="" >
                <p className="text-orange " style={{margin:0}}>{data?.product?.name}</p>
                <p className="text-[#000] text-sm pt-1">{data?.product?.brand}</p>
              </Typography.Title>
              <Typography.Title style={{margin:0}} level={4} className="flex gap-4">
                <Price className="text-blue">
                  {data?.product?.discountPrice
                    ? data?.product?.price - data?.product?.discountPrice
                    : data?.product?.price}
                </Price>
                <strike>
                  <Price className="text-red ">{data?.product?.price}</Price>
                </strike>
              </Typography.Title>
              <Typography.Text type="secondary" className="font-semibold">
                {data?.product?.description}
              </Typography.Text>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
