import CryptoJS from "crypto-js";

// const data = {
//     email: "santhosh@gmail.com",
//     shopId: "665850202866c796ae499381",
//     cartId: "665930991d5fcb2e064f21be",
//   };
export function encryptingData(data) {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    import.meta.env.VITE_CRYPTO_SECRET
  ).toString();
}
