import { Link } from "react-router-dom";
import { wishListContext } from "./context/WishList";
import { useContext } from "react";
import { CartListContext } from "./context/CartProvider";

export default function Header() {
    const { count } = useContext(wishListContext)
    const { list } = useContext(CartListContext)
    return (
        <>
            <div className=" md:flex md:justify-between md:px-10 px-3  my-2 text-center">
                <span className="text-3xl md:text-4xl text-center">BusinessEcommerceStore</span>
                <div className="flex justify-start md:justify-between space-x-2 text-lg mt-2">
                    <Link to="/">Home</Link>
                    <input className="border-2 border-b-gray-500 py-0 px-5 rounded-lg h-6 my-1 w-48" type="search" name="search" id="search" placeholder="Enter to Search" />
                    <Link to="/wishlist"><i className="fa-solid fa-heart text-2xl my-1.5"></i><sub>{count}</sub></Link>
                    <Link to="/cart"><i className="fa-solid fa-cart-shopping text-2xl my-1.5"></i><sub>{list.length}</sub></Link>
                    <Link to="/auth"><i className="fa-solid fa-circle-user text-2xl my-1.5"></i></Link>
                </div>
            </div>
        </>
    )
}