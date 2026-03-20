import { Route, Routes } from "react-router-dom"
import "./App.css"
import ProductShow from "./ProductShow"
import ProductList from "./ProductList"
import Header from "./Header"
import WishList from "./WishList"

export default function App() {
  return(
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<ProductList/>}/>
      <Route path="/wishlist" element={<WishList/>}/>
      <Route path="/product/:id" element={<ProductShow/>}/>
      <Route/>
    </Routes>
    </>
  )
}