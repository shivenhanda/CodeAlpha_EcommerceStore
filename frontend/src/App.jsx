import { Route, Routes } from "react-router-dom"
import "./App.css"
import ProductShow from "./ProductShow"
import ProductList from "./ProductList"
import Header from "./Header"
import WishListProvider from "./context/WishList"
import WishListPage from "./context/WishListPage"
import AuthPage from "./auth/AuthPage"
import CartProvider from "./context/CartProvider"
import CartPage from "./context/CartPage"
import { useEffect, useState } from "react"

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:8000/api/profile", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          console.log("req.user",res.user)
          setUser(res.user.user);
        } else {
          setUser(null);
        }
      })
      .finally(() => setLoading(false))
  }, []);

  return (
    <>
      <CartProvider user={user}>
        <WishListProvider user={user}>
          <Header />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/wishlist" element={<WishListPage />} />
            <Route path="/product/:id" element={<ProductShow />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="/auth" element={!loading ? <AuthPage user={user} setUser={setUser} /> : null} />
          </Routes>

        </WishListProvider>
      </CartProvider>
    </>
  );
}