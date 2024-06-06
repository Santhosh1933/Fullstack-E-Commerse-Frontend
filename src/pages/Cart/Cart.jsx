import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";
import { encryptingData, shopId, baseUrl } from "../../../Constant";
import { useRecoilValue } from "recoil";
import { AuthHook } from "../../Recoil/AuthHook";
import { GetCart } from "../../../Api";

export const Cart = () => {
  const auth = useRecoilValue(AuthHook);
  const token = useMemo(
    () => encryptingData({ email: auth.email, shopId }),
    [auth.email]
  );
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [
      "GetCart",
      {
        token,
      },
    ],
    queryFn: GetCart,
  });


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const cartItems = data?.cart?.items || [];

  return (
    <div className="container">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.productId._id}>
              {item.productId.name} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
