import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { encryptingData, shopId } from "../../../Constant";
import { useRecoilValue } from "recoil";
import { AuthHook } from "../../Recoil/AuthHook";
import { GetCart } from "../../../Api";
import { CartPageSkeleton } from "../../layouts/skeletons/CartPageSkeleton";
import { Empty, Typography } from "antd";
import { CartCard } from "../../layouts/cards/CartCard";

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
    return (
      <div>
        <CartPageSkeleton />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const cartItems = data?.cart?.items || [];

  return (
    <div className="container py-4">
      <Typography.Title level={2}>
        <p className="text-orange ">Cart</p>
      </Typography.Title>
      {cartItems.length === 0 ? (
        <div>
          <Empty />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="grid grid-cols-1 gap-4">
            <Typography.Title level={4}>
              <p className="text-orange ">Total Products in Cart : <span className="text-blue ">{cartItems.length}</span></p>
            </Typography.Title>

            {cartItems.map((item) => (
              <CartCard key={item._id} item={item} refetch={refetch}/>
            ))}
          </ul>
          <div className="">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            repellat at, voluptatum, et nobis veritatis nostrum minima, animi
            omnis mollitia quos molestiae deleniti quidem. Ullam officia
            expedita in rerum similique explicabo molestias aperiam harum, quae
            sit, soluta obcaecati repellendus sint minus laboriosam. A iusto
            veniam at reprehenderit architecto dolor corrupti.
          </div>
        </div>
      )}
    </div>
  );
};
