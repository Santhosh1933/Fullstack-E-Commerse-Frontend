import { useQuery } from "@tanstack/react-query";
import { Empty, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getTopProducts } from "../../../Api";
import { ProductLayout } from "../../layouts/ProductLayout";
import { ProductCardSkeleton } from "../../layouts/skeletons/ProductCardSkeleton";
import { ProductCard } from "../../layouts/cards/ProductCard";
import { useLocation } from "react-router-dom";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category") || null;
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["Products"],
    queryFn: getTopProducts,
  });
  useEffect(() => {
    refetch();
  }, [location.search, refetch]);

  useEffect(() => {
    if (data) {
      let filteredProducts = data.products;
      if (category) {
        filteredProducts = filteredProducts.filter(product =>
          product.category.name.toLowerCase() === category.toLowerCase()
        );
      }
      setProducts(filteredProducts);
    }
  }, [data, category]);

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
              {products?.length > 0 ? (
                products?.map((product, index) => (
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
