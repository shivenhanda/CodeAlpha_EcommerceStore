import { createContext, useEffect, useState } from "react";
import FetchProductId from "./api/FetchProductId";


export const wishListContext = createContext();

export default function WishListProvider({ children }) {
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);
    const [product, setProduct] = useState([])
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
                list.map((id) => FetchProductId(id))
            );
            setProduct(products);
        }

        loadProducts();
    }, [list])
    function capitalizeFirstLetter(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function AddList(value) {
        if (!list.includes(value)) {
            setCount(count + 1);
            setList(prev => [...prev, value])
        }
        else {
            setCount(count - 1)
            setList(prev => [prev.filter((item) => item !== value)])
        }
    }

    return (
        <wishListContext.Provider value={{ count, AddList, list, width, product }}>
            {children}
        </wishListContext.Provider>
    );
}