import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { AuthHook } from "../Recoil/AuthHook";
import { ShopDetails } from "../Recoil/ShopDetails";
import { IoMdMenu } from "react-icons/io";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../Firebase.config";
import { baseUrl, encryptingData } from "../../Constant";
import { IoCartOutline } from "react-icons/io5";
import { BsBagCheck } from "react-icons/bs";
import { CiShop } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";


export const Navbar = () => {
  const navigate = useNavigate();
  const [authHook, setAuth] = useRecoilState(AuthHook);
  const shopDetails = useRecoilValue(ShopDetails);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const menus = [
    {
      id: 1,
      name: (
        <div className="flex items-center gap-2">
          Shop <CiShop size={18}/>
        </div>
      ),
      func: () => {
        console.log("first");
      },
    },
    {
      id: 2,
      name: (
        <div className="flex items-center gap-2">
          About Us <FaRegUser size={18}/>
        </div>
      ),
      func: () => {
        console.log("first");
      },
    },
    {
      id: 3,
      name: (
        <div className="flex items-center gap-2">
          Cart <IoCartOutline size={18}/>
        </div>
      ),
      func: () => {},
    },
    {
      id: 4,
      name: (
        <div className="flex items-center gap-2">
          Order <BsBagCheck size={18}/>
        </div>
      ),
      func: () => {},
    },
  ];

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
  }

  return (
    <div className="bg-white shadow-sm w-full border-b py-4 fixed z-50">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={shopDetails?.shopLogo}
            alt=""
            className="w-[40px] cursor-pointer sm:w-[50px]  "
          />
        <div className="lg:block hidden">
          <p className="title cursor-pointer text-lg text-center sm:text-2xl text-blue">
            {shopDetails?.name}
          </p>
        </div>
        </div>
        <div className="block lg:hidden">
          <p className="title  cursor-pointer text-lg text-center sm:text-2xl text-blue">
            {shopDetails?.name}
          </p>
        </div>
        <div className=" flex items-center gap-2 lg:gap-8">
          <div className="hidden lg:flex gap-4">
            {menus.map((menu) => (
              <p
                key={menu.id}
                onClick={menu.func}
                className=" cursor-pointer duration-200 hover:text-blue"
              >
                {menu.name}
              </p>
            ))}
          </div>
          <div>
            {authHook.authState ? (
              <div>
                <div className="rounded-full cursor-pointer overflow-hidden">
                  <img
                    src={authHook.profileUrl}
                    alt=""
                    className="w-[40px] rounded-full hover:scale-105 duration-300"
                  />
                </div>
              </div>
            ) : (
              <div>
                <button
                  onClick={handleGoogleAuth}
                  className="flex gap-2 items-center sm:border py-1 px-3 rounded-full shadow-sm hover:border-blue duration-300 hover:shadow-md"
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
        <div className="lg:hidden" ref={btnRef} onClick={onOpen}>
          <IoMdMenu size={24} />
        </div>
        </div>

      </div>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className="title text-blue">
            {shopDetails?.name}
          </DrawerHeader>

          <DrawerBody></DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
