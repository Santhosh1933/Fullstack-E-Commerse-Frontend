import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeIndex } from "./pages/Home";
import { Navbar } from "./pages/Navbar";
import { useRecoilState } from "recoil";
import { ShopDetails } from "./Recoil/ShopDetails";
import { useQuery } from "@tanstack/react-query";
import { getShopDetails } from "../Api";
import { Loader } from "./assets/Loader";
import { Footer } from "./pages/Footer";
import { ProductIndex } from "./pages/Products";
import { IndividualProducts } from "./pages/IndividualProduct";
import { PageNotFound } from "./pages/PageNotFound";
import { CartIndex } from "./pages/Cart";

export default function App() {
  const [shopDetails, setShopDetails] = useRecoilState(ShopDetails);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fetchShopDetails"],
    queryFn: getShopDetails,
  });
  if (isLoading) {
    return <Loader />;
  }
  if (data) {
    document.title = data.name;
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = data.shopLogo;
    setShopDetails(data);
  }
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeIndex />} />
            <Route path="/products" element={<ProductIndex />} />
            <Route
              path="/products/:productName/:productId"
              element={<IndividualProducts />}
            />
            <Route path="/cart" element={<CartIndex />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
