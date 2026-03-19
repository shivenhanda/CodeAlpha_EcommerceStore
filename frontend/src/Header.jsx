import { Link } from "react-router-dom";

export default function Header(){
    return(
        <>
        <div className="md:flex md:justify-between md:px-10 px-3  my-2">
            <span className="text-3xl md:text-4xl text-center">BusinessEcommerceStore</span>
            <div className="flex justify-between space-x-2 text-base md:text-lg">
            <Link to="/">Home</Link>
            <input className="border-2 border-b-gray-500 py-0 px-5 rounded-lg h-6 my-1" type="search" name="search" id="search" placeholder="Enter to Search"/>
            <i class="fa-solid fa-cart-shopping text-2xl my-2"></i>
            </div>
        </div>
        </>
    )
}