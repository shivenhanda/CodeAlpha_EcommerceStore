import React, { useEffect, useState } from 'react'
import { createContext } from 'react';
import FetchProductId from '../api/FetchProductId';

export const CartListContext = createContext();
export default function CartProvider({ children }) {
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
    return (
        <CartListContext.Provider value={{ list,CartList, width, product ,RemoveCartList}}>
            {children}
        </CartListContext.Provider>
    )
}
