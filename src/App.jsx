import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeIndex } from "./pages/Home";
import { Navbar } from "./pages/Navbar";
import { useRecoilState, useRecoilValue } from "recoil";
import { ShopDetails } from "./Recoil/ShopDetails";
import { useQuery } from "@tanstack/react-query";
import { getShopDetails } from "../Api";
import { Loader } from "./assets/Loader";

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
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeIndex />} />
      </Routes>
    </BrowserRouter>
  );
}
