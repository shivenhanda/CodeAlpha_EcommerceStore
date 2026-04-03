import { useContext } from "react"
import { wishListContext } from "./WishList"


export default function WishListPage() {
    const { width,product } = useContext(wishListContext)
    if (product.length === 0) return <p className="text-center">No products found</p>;
    return (
        <>
            {
                product.map((item) => {
                    return <div key={item.name}>
                        <div className={`w-full flex ${width < 400 ? 'flex-col justify-center items-center' : ""}`}>
                            <img src={item.thumbnail} alt={product.title} />
                            <div className="flex flex-col p-2">
                                <h1 className="text-lg md:text-2xl text-center font-bold">{item.title}</h1>
                                <p className="text-lg md:text-2xl font-semibold -2">Desciption: <span className="text-base md:text-lg font-normal">{item.description}</span></p>
                                <p className="text-lg md:text-2xl font-semibold">Rating: <span className="text-base md:text-lg font-normal reviewratings"><i className="fa-regular fa-star"></i> {item.rating}</span></p>
                                <p className="text-lg md:text-2xl font-semibold">Brand: <span className="text-base md:text-lg font-normal">{item.brand}</span></p>
                                <p className="text-lg md:text-2xl font-semibold">Category: <span className="text-base md:text-lg font-normal">{item.category}</span></p>
                            </div>
                        </div>
                    </div>
                })
            }
        </>
    )
}