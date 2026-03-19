import { Route, Routes } from "react-router-dom"
import "./App.css"
import ProductShow from "./ProductShow"
import ProductList from "./ProductList"
import Header from "./Header"

export default function App() {
  return(
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<ProductList/>}/>
      <Route path="/product/:id" element={<ProductShow/>}/>
      <Route/>
    </Routes>
    </>
  )
}