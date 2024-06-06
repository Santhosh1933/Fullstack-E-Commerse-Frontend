import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useState, useCallback, useEffect } from "react";
import { Price } from "../../components/Price";
import { debounce } from "lodash";
import { addToCart, removeFromCart } from "../../../Api";
import { useMutation } from "@tanstack/react-query";
import { encryptingData, shopId } from "../../../Constant";
import { useRecoilValue } from "recoil";
import { AuthHook } from "../../Recoil/AuthHook";

export const CartCard = ({ item ,refetch}) => {
  const [quantity, setQuantity] = useState(item?.quantity);
  const auth = useRecoilValue(AuthHook);
  const { mutate, isError, isPending, error, isSuccess } = useMutation({
    mutationFn: addToCart,
  });
  const {
    mutate: rmMutate,
    isError: rmIsError,
    isPending: rmPending,
    error: rmError,
    isSuccess: rmIsSuccess,
  } = useMutation({
    mutationFn: removeFromCart,
  });

  const updateCart = useCallback(
    debounce(async (newQuantity) => {
      const token = encryptingData({
        email: auth.email,
        shopId,
      });
      const productId = item?.productId?._id;
      mutate({ token, productId, quantity: newQuantity });
    }, 1000),
    []
  );

  function handleQuantity(operation) {
    let newQuantity;
    switch (operation) {
      case "add":
        newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateCart(newQuantity);
        break;

      case "minus":
        if (quantity !== 1) {
          newQuantity = quantity - 1;
          setQuantity(newQuantity);
          updateCart(newQuantity);
        }
        break;

      default:
        break;
    }
  }

	async function removeCart(){
		const token = encryptingData({
			email: auth.email,
			shopId,
		});
		const productId = item?.productId?._id;
		rmMutate({ token, productId});
	}

	useEffect(()=>{
		if(rmIsSuccess){
			refetch()
		}
	},[rmIsSuccess, rmError, rmPending,rmIsError])

  return (
    <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white border border-[#949494] rounded-md shadow-md">
      <img
        src={item?.productId?.thumbnail}
        alt=""
        className="w-full object-cover object-top h-[200px] rounded-sm"
      />
      <div>
        <Typography.Title level={5}>
          <p className="text-orange ">{item?.productId?.name}</p>
        </Typography.Title>
        <Price className="pb-4">
          {(
            (item?.productId?.discountPrice
              ? item?.productId?.price - item?.productId?.discountPrice
              : item?.productId?.price) * quantity
          ).toFixed(2)}
        </Price>

        <div className="w-full grid items-center grid-cols-3">
          <Button
            onClick={() =>
              quantity === 1 ? removeCart() : handleQuantity("minus")
            }
            danger
            type="primary"
          >
            {quantity === 1 ? <DeleteOutlined /> : <MinusOutlined />}
          </Button>
          <p className="text-center">{quantity}</p>
          <Button
            onClick={() => handleQuantity("add")}
            type="primary"
            style={{
              backgroundColor: "#52c41a",
            }}
          >
            <PlusOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
};
