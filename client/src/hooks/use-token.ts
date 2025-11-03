import { useEffect, useState } from "react";
import { tokenStore } from "@/lib/token-store";

export default function useToken() {
  const [token, setToken] = useState(tokenStore.get());

  useEffect(() => {
    const unsubscribe = tokenStore.subscribe(() => {
      setToken(tokenStore.get());
    }); // unsubscribe on destroy
    return () => {
      unsubscribe();
    };
  }, []);

  return token;
}
