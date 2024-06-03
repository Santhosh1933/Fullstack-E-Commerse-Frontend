import { baseUrl, encryptingShopId, shopId } from "./Constant";

async function getShopDetails() {
  const res = await fetch(`${baseUrl}/shop/${shopId}`);
  const data = await res.json();
  return data;
}
async function getTopProducts({queryKey }) {
  const {start,end}=queryKey[1]
  const res = await fetch(
    `${baseUrl}/getProduct?token=${encryptingShopId()}&start=${start}&end=${end}`
  );
  const data = await res.json();
  return data;
}
async function Products() {
  const res = await fetch(
    `${baseUrl}/getProduct?token=${encryptingShopId()}`
  );
  const data = await res.json();
  return data;
}
async function getCategories() {
  const res = await fetch(
    `${baseUrl}/getCategories?token=${encryptingShopId()}`
  );
  const data = await res.json();
  return data;
}


export { getShopDetails,getTopProducts,getCategories ,Products};
