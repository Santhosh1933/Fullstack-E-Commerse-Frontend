import { baseUrl, encryptingShopId, shopId } from "./Constant";

async function getShopDetails() {
  const res = await fetch(`${baseUrl}/shop/${shopId}`);
  const data = await res.json();
  return data;
}
async function getTopProducts({ queryKey }) {
  let { start, end } = { start: null, end: null };
  if (queryKey.length == 2) {
    start = queryKey[1].start;
    end = queryKey[1].end;
  }
  let url = `${baseUrl}/getProduct?token=${encryptingShopId()}&start=${start}&end=${end}`;
  if (!start && !end) {
    url = `${baseUrl}/getProduct?token=${encryptingShopId()}`;
  }
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
async function Products() {
  const res = await fetch(`${baseUrl}/getProduct?token=${encryptingShopId()}`);
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

export { getShopDetails, getTopProducts, getCategories, Products };
