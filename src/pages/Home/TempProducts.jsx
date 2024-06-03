import { Button, Typography } from "antd";
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

export const TempProducts = () => {
  const authHook = useRecoilValue(AuthHook);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["Products"],
    queryFn: getTopProducts,
  });

  useEffect(() => {
    refetch();
  }, []);

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
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </ProductLayout>
        )}
      </div>
    </div>
  );
};
