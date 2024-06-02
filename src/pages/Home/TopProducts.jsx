import React, { useEffect, useState } from "react";
import { Typography } from "antd";
const { Title } = Typography;
import { TopProductLayout } from "../../layouts/TopProductLayout";
import { TopProductCard } from "../../layouts/cards/TopProductCard";
import { baseUrl, encryptingShopId, shopId } from "../../../Constant";
import { TopProductCardSkeleton } from "../../layouts/skeletons/TopProductCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getTopProducts } from "../../../Api";

export const TopProducts = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getTopProducts"],
    queryFn: getTopProducts,
  });

  console.log({ data, isLoading, isError, error });

  return (
    <div className="bg-[#f3fafa]">
      <div className="container py-8">
        <Title level={2}>
          <p className="text-orange">Top Selling Products</p>
        </Title>
        {isLoading && (
          <TopProductLayout>
            <TopProductCardSkeleton />
            <TopProductCardSkeleton />
            <TopProductCardSkeleton />
          </TopProductLayout>
        )}
        {data && !isError && (
          <TopProductLayout>
            {data?.products?.length > 0 ? (
              data?.products?.map((product, index) => (
                <TopProductCard key={index} product={product} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </TopProductLayout>
        )}
      </div>
    </div>
  );
};
