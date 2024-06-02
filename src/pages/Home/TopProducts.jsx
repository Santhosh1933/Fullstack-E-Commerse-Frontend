import React, { useEffect, useState } from "react";
import { Typography } from "antd";
const { Title } = Typography;
import { TopProductLayout } from "../../layouts/TopProductLayout";
import { TopProductCard } from "../../layouts/cards/TopProductCard";
import { useRecoilValue } from "recoil";
import { AuthHook } from "../../Recoil/AuthHook";
import { baseUrl, encryptingShopId, shopId } from "../../../Constant";
import { TopProductCardSkeleton } from "../../layouts/skeletons/TopProductCardSkeleton";

export const TopProducts = () => {
  const [loadingData, setLoadingData] = useState(false);
  const [productData, setProductData] = useState([]);
  
  async function getTopProducts() {
    try {
      setLoadingData(true);
      const res = await fetch(
        `${baseUrl}/getProduct?token=${encryptingShopId(shopId)}&start=0&end=3`
      );
      const result = await res.json();
      if (Array.isArray(result?.products)) {
        setProductData(result?.products);
      } else {
        setProductData([]);
      }
      console.log(result?.products);
    } catch (error) {
      setProductData([]);
    } finally {
      setLoadingData(false);
    }
  }

  useEffect(() => {
    getTopProducts();
  }, []);

  return (
    <div className="bg-[#f3fafa]">
      <div className="container py-8">
        <Title level={2}>
          <p className="text-orange">Top Selling Products</p>
        </Title>
        {loadingData ? (
          <TopProductLayout>
            <TopProductCardSkeleton />
            <TopProductCardSkeleton />
            <TopProductCardSkeleton />
          </TopProductLayout>
        ) : (
          <TopProductLayout>
            {productData.length > 0 ? (
              productData.map((product, index) => (
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
