import { Route, Routes } from "react-router-dom"
import "./App.css"
import ProductShow from "./ProductShow"
import ProductList from "./ProductList"
import Header from "./Header"
import WishList from "./context/WishList"
import WishListProvider from "./context/WishList"
import WishListPage from "./context/WishListPage"
import AuthPage from "./auth/AuthPage"

export default function App() {
  return(
    <>
    <WishListProvider>
    <Header/>
    <Routes>
      <Route path="/" element={<ProductList/>}/>
      <Route path="/wishlist" element={<WishListPage/>}/>
      <Route path="/product/:id" element={<ProductShow/>}/>
      <Route path="/auth" element={<AuthPage/>}/>
      <Route/>
    </Routes>
    </WishListProvider>
    </>
  )
}