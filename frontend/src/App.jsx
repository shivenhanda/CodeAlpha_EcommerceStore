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

export default function App() {
  return(
    <>
    <CartProvider>
    <WishListProvider>
    <Header/>
    <Routes>
      <Route path="/" element={<ProductList/>}/>
      <Route path="/wishlist" element={<WishListPage/>}/>
      <Route path="/product/:id" element={<ProductShow/>}/>
      <Route path="cart" element={<CartPage/>}/>
      <Route path="/auth" element={<AuthPage/>}/>
      <Route/>
    </Routes>
    </WishListProvider>
    </CartProvider>
    </>
  )
}