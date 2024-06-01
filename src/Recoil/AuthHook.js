import { atom } from "recoil";
import { decryptingData } from "../../Constant";

const token = localStorage.getItem("token");
const decryptedToken = token ? decryptingData(token) : null;
const email = decryptedToken ? decryptedToken.email : null;

export const AuthHook = atom({
  key: "AuthHook",
  default: email
    ? {
        authState: true,
        email,
        profileUrl: decryptedToken && decryptedToken.profileUrl,
        name: decryptedToken && decryptedToken.name,
      }
    : {
        authState: false,
        email: null,
      },
});
