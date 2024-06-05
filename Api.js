import { baseUrl, shopId } from "./Constant";

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
  let url = `${baseUrl}/getProduct?shopId=${shopId}&start=${start}&end=${end}`;
  if (!start && !end) {
    url = `${baseUrl}/getProduct?shopId=${shopId}`;
  }
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
async function Products() {
  const res = await fetch(`${baseUrl}/getProduct?shopId=${shopId}`);
  const data = await res.json();
  return data;
}
async function GetProductById({ queryKey }) {
  const productId = queryKey[1].productId;
  const res = await fetch(`${baseUrl}/getProductById/${productId}`);
  const data = await res.json();
  return data;
}

async function getCategories() {
  const res = await fetch(`${baseUrl}/getCategories?shopId=${shopId}`);
  const data = await res.json();
  return data;
}

async function addToCart(data) {
  const res = await fetch(`${baseUrl}/add-to-cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await res.json();
  return responseData;
}

export {
  getShopDetails,
  getTopProducts,
  getCategories,
  Products,
  GetProductById,
  addToCart
};
