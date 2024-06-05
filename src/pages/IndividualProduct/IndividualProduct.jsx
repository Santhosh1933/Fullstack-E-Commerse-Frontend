import { GetProductById, addToCart } from "../../../Api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { IndividualProductPageSkeleton } from "../../layouts/skeletons/IndividualProductPageSkeleton";
import { useEffect, useState } from "react";
import { Button, ConfigProvider, Typography, message } from "antd";
import { Price } from "../../components/Price";
import { LoadingOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { CategoryListing } from "../Home/CategoryListing";
import { useRecoilValue } from "recoil";
import { AuthHook } from "../../Recoil/AuthHook";
import { encryptingData, shopId } from "../../../Constant";

export const IndividualProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useRecoilValue(AuthHook);
  const productId = location.pathname.split("/")[3];
  const [activeImage, setActiveImage] = useState("");
  const [images, setImages] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["Product", { productId: productId }],
    queryFn: GetProductById,
  });

  const {
    mutate,
    isError: addToCartIsError,
    isPending,
    error: addToCartError,
    isSuccess,
  } = useMutation({
    mutationFn: addToCart,
  });

  if (isError) {
    navigate("/products");
    return null;
  }

  async function handleAddToCart() {
    if (!auth.authState) {
      messageApi.open({
        type: "error",
        content: "Please log in to add items to your cart.",
      });
    } else {
      const token = encryptingData({
        email: auth.email,
        shopId,
      });
      const productId = data?.product?._id;
      mutate({ token, productId, quantity: 1 });
    }
  }

  useEffect(() => {
    if (data) {
      setActiveImage(data?.product?.thumbnail);
      setImages([data?.product?.thumbnail, ...data?.product?.images]);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess && !isPending) {
      messageApi.open({
        type: "success",
        content: "Item added to cart successfully!",
        duration: 2.5,
      });
    } else if (addToCartIsError) {
      messageApi.open({
        type: "error",
        content: "Failed to add item to cart. Please try again later.",
        duration: 2.5,
      });
    }
  }, [isPending, isSuccess, addToCartIsError]);

  return (
    <div>
      {contextHolder}
      {isLoading ? (
        <IndividualProductPageSkeleton />
      ) : (
        <div className="container py-4 sm:py-10">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 pb-6">
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
              <Typography.Title level={2} className="">
                <p className="text-orange " style={{ margin: 0 }}>
                  {data?.product?.name}
                </p>
                <p className="text-[#000] text-sm pt-1">
                  {data?.product?.brand}
                </p>
              </Typography.Title>
              <Typography.Title level={4} className="flex gap-4">
                <Price className="text-blue">
                  {data?.product?.discountPrice
                    ? data?.product?.price - data?.product?.discountPrice
                    : data?.product?.price}
                </Price>
                <strike>
                  <Price className="text-red ">{data?.product?.price}</Price>
                </strike>
              </Typography.Title>
              <div className="pb-4 pt-1">
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        colorPrimary: `#f5222d`,
                        colorPrimaryHover: "#ff4d4f",
                        colorPrimaryActive: `#cf1322`,
                        lineWidth: 0,
                      },
                    },
                  }}
                >
                  <Button
                    type="primary"
                    icon={
                      isPending ? (
                        <LoadingOutlined className="text-lg" />
                      ) : (
                        <ShoppingCartOutlined className="text-lg" />
                      )
                    }
                    iconPosition={"end"}
                    className="w-full xl:w-3/4 h-10"
                    onClick={!isPending && handleAddToCart}
                  >
                    Add To Cart
                  </Button>
                </ConfigProvider>
              </div>
              <Typography.Text type="secondary" className="font-semibold">
                {data?.product?.description}
              </Typography.Text>
              <Typography.Title level={4}>
                <p className="text-orange ">Product Details</p>
              </Typography.Title>
              <Typography.Text type="secondary" className="font-semibold">
                {data?.product?.productDetails}
              </Typography.Text>
              <Typography.Title level={4}>
                <p className="text-orange ">Product Specifications</p>
              </Typography.Title>
              <div>
                {data?.product?.specifications &&
                  Object.entries(data.product.specifications).map(
                    ([key, value]) => (
                      <div key={key} className="grid grid-cols-2">
                        <Typography.Text className="font-semibold">
                          {key}:
                        </Typography.Text>
                        <Typography.Text>{value}</Typography.Text>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
          <hr className="pb-4 text-[#d3d3d3]" />
          <Typography.Title level={2} className="">
            <p className="text-orange ">{data?.product?.category?.name}</p>
          </Typography.Title>
          <CategoryListing categoryName={false} />
        </div>
      )}
    </div>
  );
};
