import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./layouts/auth";
import BaseLayout from "./layouts/base";
import { refreshToken } from "./lib/auth";
import { tokenStore } from "./lib/token-store";
import Home from "./pages/home";
import Login from "./pages/login";
import LoginPassword from "./pages/login-password";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshToken()
      .then(({ access_token }) => tokenStore.set(access_token))
      .finally(() => setLoading(false));
  }, []);

  // block rendering
  // for TOKEN to fetch and set
  if (loading) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="log-in" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="password" element={<LoginPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
