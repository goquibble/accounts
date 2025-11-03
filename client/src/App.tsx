import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import BaseLayout from "./layouts/base";
import { refreshToken } from "./lib/auth";
import { tokenStore } from "./lib/token-store";
import Home from "./pages/home";
import Login from "./pages/login";
import LoginPassword from "./pages/login-password";

export default function App() {
  useEffect(() => {
    refreshToken().then(({ access_token }) => {
      tokenStore.set(access_token);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="log-in" element={<BaseLayout />}>
          <Route index element={<Login />} />
          <Route path="password" element={<LoginPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
