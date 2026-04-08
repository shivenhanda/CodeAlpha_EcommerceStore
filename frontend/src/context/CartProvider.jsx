import React, { useEffect, useState } from 'react'
import { createContext } from 'react';
import FetchProductId from '../api/FetchProductId';

export const CartListContext = createContext();
export default function CartProvider({ children ,user}) {
    const [list, setList] = useState([])
    const [product,setProduct]=useState([])
    function CartList(value) {
        if (!list.includes(value)) { setList(prev => [...prev, value]) }
    }
    function RemoveCartList(value) {
        if (list.includes(value)) { setList(prev => prev.filter((item)=>item!=value)) }
    }
    const [width, setWidth] = useState(window.innerWidth)
    useEffect(() => {
        const handleSize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleSize)
        return () => {
            window.removeEventListener("resize", handleSize)
        }
    }, [])
     useEffect(() => {
            async function loadProducts() {
                const products = await Promise.all(
                    list.map((id) =>FetchProductId(id))
                );
                setProduct(products);
            }
    
            loadProducts();
        }, [list])
    useEffect(()=>{
        async function fetchCart(){
            if(!user || !navigator.onLine) return;
            try {
                const res = await fetch("http://localhost:8000/api/cartData", {
                    method: "GET"
                });
                const data = await res.json();
                if (data.success) {
                    console.log("data.cartlist",data.cartlist)
                    setList(data.cartlist || []);
                }
            } catch (error) {
                console.log("fetch wishlist error", error);
            }
        }
        fetchCart();
    },[user])
    useEffect(()=>{
        async function syncCart(){
            if (!user || !navigator.onLine) return;
            console.log("user",user)
            try {
                let res = await fetch("http://localhost:8000/api/cartData", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        cartlist: list
                    })
                });
                res=await res.json();
                if(!res.success){
                    console.log(res.message)
                }
                console.log(res.success,res.message)
            } catch (error) {
                console.log("error", error);
            }
        }
        syncCart();
    },[list])
    return (
        <CartListContext.Provider value={{ list,CartList, width, product ,RemoveCartList}}>
            {children}
        </CartListContext.Provider>
    )
}
