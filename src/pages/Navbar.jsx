import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { AuthHook } from "../Recoil/AuthHook";
import { ShopDetails } from "../Recoil/ShopDetails";
import { IoMdMenu } from "react-icons/io";

import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../Firebase.config";
import { baseUrl, encryptingData } from "../../Constant";
import { IoCartOutline } from "react-icons/io5";
import { BsBagCheck } from "react-icons/bs";
import { CiShop } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import {
  Button,
  ConfigProvider,
  Drawer,
  Popover,
  Space,
  notification,
} from "antd";
import {
  ArrowRightOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const Navbar = () => {
  const navigate = useNavigate();
  const [authHook, setAuth] = useRecoilState(AuthHook);
  const shopDetails = useRecoilValue(ShopDetails);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Login Successful",
      description: (
        <div className="text-orange lowercase">
          Welcome's you {authHook?.name}
        </div>
      ),
      duration: 1,
    });
  };

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const hideDrawer = () => {
    setDrawerOpen(false);
  };

  const menus = [
    {
      id: 1,
      name: "Products",
      icon: <ShopOutlined />,
      func: () => {
        navigate("/products");
        hideDrawer()
      },
    },
    {
      id: 2,
      name: "About Us",
      icon: <UserOutlined />,
      func: () => {
        console.log("first");
      },
    },
    {
      id: 3,
      name: "Cart",
      icon: <ShoppingCartOutlined />,
      func: () => {},
    },
    {
      id: 4,
      name: "Order",
      icon: <ShoppingOutlined />,
      func: () => {},
    },
  ];

  const profileContent = (
    <div className="flex gap-4 flex-col">
      <p>Profile</p>
      <Button type="primary" danger onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );

  async function handleGoogleAuth() {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const email = result?.user?.email;
    const profileUrl = result?.user?.photoURL;
    const name = result?.user?.displayName;
    const data = {
      email,
      profileUrl,
      name,
    };
    const token = encryptingData(data);
    localStorage.setItem("token", token);
    setAuth({
      authState: true,
      email,
      profileUrl,
      name,
    });
    const res = await fetch(`${baseUrl}/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    if (res.ok) {
      openNotificationWithIcon("success");
    }
  }

  async function handleLogout() {
    localStorage.removeItem("token");
    setAuth({
      authState: false,
      email: null,
    });
  }

  return (
    <div className="bg-white outline-none shadow-sm w-full border-b h-[13vh] flex fixed z-50">
      {contextHolder}
      <div className="container flex justify-between items-center">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="flex items-center gap-4"
        >
          <img
            src={shopDetails?.shopLogo}
            alt=""
            className="w-[40px] cursor-pointer sm:w-[50px]  "
          />
          <div  className="lg:block hidden">
            <p className="title cursor-pointer text-lg text-center sm:text-2xl text-orange">
              {shopDetails?.name}
            </p>
          </div>
        </div>
        <div  onClick={() => {
            navigate("/");
          }} className="block lg:hidden">
          <p className="title  cursor-pointer text-lg text-center sm:text-2xl text-orange">
            {shopDetails?.name}
          </p>
        </div>
        <div className=" flex items-center gap-2 lg:gap-8">
          <div className="hidden lg:flex gap-4">
            {menus.map((menu) => (
              <Button
                icon={menu.icon}
                iconPosition={"end"}
                type="link"
                className="text-[#000]"
                onClick={menu.func}
                key={menu.id}
              >
                {menu.name}
              </Button>
            ))}
          </div>
          <div>
            {authHook.authState ? (
              <div>
                <Popover content={profileContent} trigger="click">
                  <div className="rounded-full cursor-pointer overflow-hidden">
                    <img
                      src={authHook.profileUrl}
                      alt=""
                      className="w-[40px] rounded-full hover:scale-105 duration-300"
                    />
                  </div>
                </Popover>
              </div>
            ) : (
              <div>
                <button
                  onClick={handleGoogleAuth}
                  className="flex gap-2 items-center sm:border py-1 px-3 rounded-full shadow-sm hover:border-orange duration-300 hover:shadow-md"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/archive/c/c1/20230822192910%21Google_%22G%22_logo.svg"
                    alt=""
                    className="w-[20px]"
                  />
                  <p className="hidden sm:block"> Sign In</p>
                </button>
              </div>
            )}
          </div>
          <div className="lg:hidden cursor-pointer" onClick={showDrawer}>
            <IoMdMenu size={24} />
          </div>
        </div>
      </div>

      {/* Drawer Area */}

      <Drawer title={shopDetails?.name} onClose={hideDrawer} open={drawerOpen}>
        <div className="flex flex-col justify-start items-start gap-4">
          {menus.map((menu) => (
            <Button
              icon={menu.icon}
              iconPosition={"end"}
              type="link"
              className="text-[#000]"
              onClick={menu.func}
              key={menu.id}
            >
              {menu.name}
            </Button>
          ))}
        </div>
      </Drawer>
    </div>
  );
};
