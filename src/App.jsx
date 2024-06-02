import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeIndex } from "./pages/Home";
import { Navbar } from "./pages/Navbar";
import { AuthHook } from "./Recoil/AuthHook";
import { useRecoilState, useRecoilValue } from "recoil";
import { ShopDetails } from "./Recoil/ShopDetails";
import { baseUrl, shopId } from "../Constant";

export default function App() {
  const authHook = useRecoilValue(AuthHook);
  const [shopDetails, setShopDetails] = useRecoilState(ShopDetails);

  async function getShopDetails() {
    try {
      const res = await fetch(`${baseUrl}/shop/${shopId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch shop details");
      }
      const data = await res.json();
      document.title = data.name;
      var link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = data.shopLogo
      setShopDetails(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getShopDetails();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeIndex />} />
      </Routes>
    </BrowserRouter>
  );
}
