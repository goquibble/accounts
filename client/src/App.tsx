import { BrowserRouter, Route, Routes } from "react-router";
import BaseLayout from "./layouts/base";
import Home from "./pages/home";
import Login from "./pages/login";
import LoginPassword from "./pages/login-password";

export default function App() {
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
