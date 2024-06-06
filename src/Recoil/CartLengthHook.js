import { atom } from "recoil";

export const CartLengthHook = atom({
  key: "CartLengthHook",
  default: {
    cartLength:0,
    mutateFu:null
  },
});
