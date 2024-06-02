import { useQuery } from "@tanstack/react-query";
import { Typography } from "antd";
import React from "react";
import { getCategories } from "../../../Api";
import { CategoryListingLayout } from "../../layouts/CategoryListingLayout";
import { CategoryListingCard } from "../../layouts/cards/CategoryListingCard";
import { CategoryListingCardSkeleton } from "../../layouts/skeletons/CategoryListingCardSkeleton";

export const CategoryListing = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
  });
  return (
    <div className="">
      <div className="container py-8">
        <Typography.Title level={2}>
          <p className="text-orange">Categories</p>
        </Typography.Title>
        {isLoading && (
          <CategoryListingLayout>
            <CategoryListingCardSkeleton />
            <CategoryListingCardSkeleton />
            <CategoryListingCardSkeleton />
            <CategoryListingCardSkeleton />
          </CategoryListingLayout>
        )}
        {data && !isError && (
          <CategoryListingLayout>
            {data?.categories?.map((category) => (
              <CategoryListingCard category={category} key={category._id}/>
            ))}
          </CategoryListingLayout>
        )}
      </div>
    </div>
  );
};
