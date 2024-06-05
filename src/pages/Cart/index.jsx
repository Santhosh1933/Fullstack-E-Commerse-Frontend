import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AuthHook } from "../../Recoil/AuthHook";
import { Button, Result } from "antd";
import { baseUrl, encryptingData } from "../../../Constant";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../../Firebase.config";

export const CartIndex = () => {
  const [authHook,setAuth] = useRecoilState(AuthHook);
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
    <div>
      <div className="pt-[13vh]"></div>
      {!authHook.authState ? (
        <>
          <Result
            status="warning"
            title="
            Log in and navigate to your cart."
            extra={
              <div className="w-full justify-center items-center flex">
                <Button
                  type=""
                  key="console"
                  className="flex gap-2 rounded-full"
                  onClick={handleGoogleAuth}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/archive/c/c1/20230822192910%21Google_%22G%22_logo.svg"
                    alt=""
                    className="w-[20px]"
                  />
                  <p className="hidden sm:block"> Sign In</p>
                </Button>
              </div>
            }
          />
        </>
      ) : (
        <div className="container">Cart</div>
      )}
    </div>
  );
};
