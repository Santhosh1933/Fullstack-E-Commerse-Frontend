import React from "react";
import { encryptingData } from "../Constant";
import { Button } from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../Firebase.config";
export default function App() {
  async function handleGoogleAuth() {
    const result = await signInWithPopup(auth, googleAuthProvider);
  }
  return (
    <div>
      <div>
        <Button colorScheme="teal" onClick={handleGoogleAuth}>
          Login
        </Button>
      </div>
    </div>
  );
}
