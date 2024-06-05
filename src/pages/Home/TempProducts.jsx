import { Button, Empty, Typography } from "antd";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { AuthHook } from "../../Recoil/AuthHook";
import { useQuery } from "@tanstack/react-query";
import { getTopProducts } from "../../../Api";
import { TopProductLayout } from "../../layouts/TopProductLayout";
import { ProductCard } from "../../layouts/cards/ProductCard";
import { ProductLayout } from "../../layouts/ProductLayout";
import { FaChevronRight } from "react-icons/fa";
import { ArrowRightOutlined, RightOutlined } from "@ant-design/icons";
import { ProductCardSkeleton } from "../../layouts/skeletons/ProductCardSkeleton";
import { useNavigate } from "react-router-dom";

export const TempProducts = () => {
  const authHook = useRecoilValue(AuthHook);
  const navigate = useNavigate()
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["Products" ,{ start:0, end:4 }],
    queryFn: getTopProducts,
  });

  return (
    <div className="bg-[#f3fafa]">
      <div className="container py-8">
        <div className="flex items-baseline pb-8 justify-between">
          <Typography.Title level={2} style={{ padding: 0, margin: 0 }}>
            <p className="text-orange " style={{ padding: 0, margin: 0 }}>
              Products
            </p>
          </Typography.Title>

          <Button
            icon={<ArrowRightOutlined />}
            iconPosition={"end"}
            type="link"
            onClick={() => {
              navigate("/products");
            }}
          >
            View All
          </Button>
        </div>
        {isLoading && (
          <ProductLayout>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </ProductLayout>
        )}
        {data && !isError && (
          <ProductLayout>
            {data?.products?.length > 0 ? (
              data?.products?.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))
            ) : (
              <div className="col-span-6">
                <Empty />
              </div>
            )}
          </ProductLayout>
        )}
      </div>
    </div>
  );
};
