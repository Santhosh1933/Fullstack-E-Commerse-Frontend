import React from "react";
import { useRecoilValue } from "recoil";
import { ShopDetails } from "../Recoil/ShopDetails";
import { Button, Typography } from "antd";
import { ArrowRightOutlined, MailOutlined } from "@ant-design/icons";

export const Footer = () => {
  const shopDetails = useRecoilValue(ShopDetails);
  console.log(shopDetails);

  return (
    <div className="w-full py-8 border-t border-[#b7b7b7]">
      <div className="container flex flex-col gap-4 text-center justify-center items-center">
        <img src={shopDetails?.shopLogo} alt="" className="h-[60px] w-[60px]" />
        <div>
          <Typography.Title level={3} style={{ padding: 0, margin: 0 }}>
            <p className="text-center" style={{ padding: 0, margin: 0 }}>
              {shopDetails?.name}
            </p>
          </Typography.Title>
        </div>
        <p>
          {`${shopDetails?.address?.street}, ${shopDetails?.address?.city}, ${shopDetails?.address?.state} ${shopDetails?.address?.postalCode}, ${shopDetails?.address?.country}`}
        </p>
        <div>
          <Button
            icon={<MailOutlined />}
            iconPosition={"end"}
            type="link"
            className="flex items-baseline"
          >
            <a href="">{shopDetails?.contact?.email}</a>
          </Button>
        </div>
      </div>
    </div>
  );
};
