import { baseUrl, encryptingShopId, shopId } from "./Constant";

async function getShopDetails() {
  const res = await fetch(`${baseUrl}/shop/${shopId}`);
  const data = await res.json();
  return data;
}
async function getTopProducts() {
  const res = await fetch(
    `${baseUrl}/getProduct?token=${encryptingShopId()}&start=0&end=3`
  );
  const data = await res.json();
  return data;
}
export { getShopDetails,getTopProducts };
