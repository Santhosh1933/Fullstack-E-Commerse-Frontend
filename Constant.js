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
export function decryptingData(token) {
  const bytes = CryptoJS.AES.decrypt(token, import.meta.env.VITE_CRYPTO_SECRET);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

export const bannerImg =
  "https://i.pinimg.com/564x/aa/fa/e9/aafae976a38bd341fa0d1d6f57a52d6e.jpg";

export const shopId = "665850202866c796ae499381";

// export const baseUrl = "https://fullstack-e-commerse-backend.onrender.com";
export const baseUrl = "http://localhost:8000";
