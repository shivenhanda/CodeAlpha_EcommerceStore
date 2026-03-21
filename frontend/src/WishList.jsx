import { createContext, useEffect, useState } from "react";
import FetchProductId from "./api/FetchProductId";


export const wishListContext = createContext();

export default function WishListProvider({ children }) {
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);
    const [product, setProduct] = useState([])

    useEffect(() => {
        list.map((item) => {
            getProduct(item)
        })
        async function getProduct(id) {
            let data = await FetchProductId(id);
            setProduct([...product, data])
        }
    }, [list])
    function AddList(value) {
        setCount(count + 1);
        setList([...list, value])
    }

    return (
        <wishListContext.Provider value={{ count, AddList }}>
            {children}
            {
                product.map((item) => {
                    return <div key={item.id}>
                        <h1 className="text-lg md:text-2xl text-center font-bold">{item.title}</h1>
                        <div className="w-full md:flex justify-center Items-center">
                            <img className="mx-auto" src={item.thumbnail} alt={product.title} />
                        </div>
                        <p className="text-lg md:text-2xl font-semibold">Desciption: <span className="text-base md:text-lg font-normal">{item.description}</span></p>
                    </div>
                })
            }
        </wishListContext.Provider>
    );
}