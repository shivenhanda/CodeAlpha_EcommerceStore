import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FetchProductId from "./api/FetchProductId";
import { wishListContext } from "./WishList";

export default function ProductShow() {
    const { id } = useParams();
    const [liked, setLiked] = useState(false)
    const [product, setProduct] = useState(null)
    const { AddList } = useContext(wishListContext)
    const navigate = useNavigate();
    useEffect(() => {
        async function getProduct() {
            let data = await FetchProductId(id);
            setProduct(data)
        }
        getProduct()
    }, [id])
    if (!product) return <p className="text-center">Loading...</p>;
    function capitalizeFirstLetter(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function AddToWishList(product) {
        setLiked(!liked)
        AddList(product.id)
    }
    return (
        <div className="product-detail md:flex flex-col w-full pl-2 pr-10">
            <button className="text-start" onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i> Back</button>
            <h1 className="text-lg md:text-2xl text-center font-bold">{product.title}</h1>
            <div className="w-full md:flex justify-center Items-center">
                <img className="mx-auto" src={product.thumbnail} alt={product.title} />
            </div>
            <div className="w-full flex justify-end dropShadow"><i className={`fa-solid fa-heart text-2xl p-5 heart ${liked ? "text-red-600" : "text-blue-300"}`} onClick={() => AddToWishList(product)}></i>
            </div>
            <p className="text-lg md:text-2xl font-semibold">Category: <span className="text-base md:text-lg font-normal">{capitalizeFirstLetter(product.category)}</span></p>
            <p className="text-lg md:text-2xl font-semibold">Rating: <span className="text-base md:text-lg font-normal reviewratings"><i className="fa-regular fa-star"></i> {product.rating}</span></p>
            <p className="text-lg md:text-2xl font-semibold">Desciption: <span className="text-base md:text-lg font-normal">{product.description}</span></p>
            <p className="text-lg md:text-2xl font-semibold">Brand: <span className="text-base md:text-lg font-normal">{product.brand}</span></p>
            {
                product && product.images.length > 0 &&
                <>
                    <p className="text-lg md:text-2xl text-center font-semibold">Images</p>
                    <div className="md:flex justify-center">
                        {product.images.map((data, index) => {
                            return <img className="mx-auto" key={index} src={data} alt={product.title} />
                        })}
                    </div>
                </>
            }
            <p className="text-lg md:text-2xl font-semibold text-center">Reviews</p>
            {
                product && product.reviews.length > 0 &&
                product.reviews.map((data, index) => {
                    return <div key={index}>
                        <p className="text-base md:text-lg font-semibold">Rating: <span className="text-small md:text-base font-normal reviewratings"><i className="fa-regular fa-star"></i> {data.rating}</span></p>
                        <p className="text-base md:text-lg font-semibold">Name: <span className="text-base md:text-lg font-normal">{data.reviewerName}</span></p>
                        <p className="text-base md:text-lg font-semibold">Review: <span className="text-base md:text-lg font-normal">{data.comment}</span></p>
                        <br />
                    </div>
                })
            }
        </div>
    )
}