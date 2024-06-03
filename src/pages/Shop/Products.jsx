import { useQuery } from "@tanstack/react-query";
import { Empty, Typography } from "antd";
import React, { useEffect } from "react";
import { getTopProducts } from "../../../Api";
import { ProductLayout } from "../../layouts/ProductLayout";
import { ProductCardSkeleton } from "../../layouts/skeletons/ProductCardSkeleton";
import { ProductCard } from "../../layouts/cards/ProductCard";

export const Products = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["Products"],
    queryFn: getTopProducts,
  });
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <div className="container pt-4">
        <Typography.Title level={2}>
          <p className="text-orange ">Products</p>
        </Typography.Title>
        <div className="pb-12">
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
    </div>
  );
};
