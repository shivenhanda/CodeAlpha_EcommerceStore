import React, { useContext } from 'react'
import { CartListContext } from './CartProvider';

export default function CartPage() {
 const { width,product,RemoveCartList } = useContext(CartListContext)
     if (product.length === 0) return <p className="text-center">No Product found</p>;
     return (
         <>
             {
                 product.map((item) => {
                     return <div key={item.id}>
                         <div className={`w-full flex ${width < 400 ? 'flex-col justify-center items-center' : "justify-between"}`}>
                             <span className={`w-80 flex justify-end ${width<=400?"":"hidden"}`}>{width<=400?<i className="fa-solid fa-x text-red-500 text-2xl" onClick={()=>RemoveCartList(item.id)}></i>:""}</span>
                             <img src={item.thumbnail} alt={item.title} />
                             <div className="flex flex-col p-2">
                                 <h1 className="text-lg md:text-2xl text-center font-bold">{item.title}</h1>
                                 <p className="text-lg md:text-2xl font-semibold -2">Desciption: <span className="text-base md:text-lg font-normal">{item.description}</span></p>
                                 <p className="text-lg md:text-2xl font-semibold">Rating: <span className="text-base md:text-lg font-normal reviewratings"><i className="fa-regular fa-star"></i> {item.rating}</span></p>
                                 <p className="text-lg md:text-2xl font-semibold">Brand: <span className="text-base md:text-lg font-normal">{item.brand}</span></p>
                                 <p className="text-lg md:text-2xl font-semibold">Category: <span className="text-base md:text-lg font-normal">{item.category}</span></p>
                             </div>
                             <span className='flex justify-center items-center p-2'>{width>400?<i className="fa-solid fa-x text-red-500 text-2xl" onClick={()=>RemoveCartList(item.id)}></i>:""}</span>
                         </div>
                     </div>
                 })
             }
         </>
     )
}
