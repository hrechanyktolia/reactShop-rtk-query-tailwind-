import React, {FC} from 'react';
import {AiOutlineClose, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {MdDeleteForever} from "react-icons/md";
import {OpenCart} from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {clearCart, decrement, increment, removeProduct} from "../redux/productSlice";

const Cart:FC<OpenCart> = ({openCart}) => {

    const cartProducts = useSelector((state: RootState) => state.products.cart)
    const dispatch = useDispatch()

    const totalPrice = () => {
        let price = 0
        cartProducts.forEach(item => price += item.price * item.count)
        return price.toFixed(2)
    }
    return (
        <div className='w-[60%] h-[70%] p-7 mx-auto my-auto fixed top-0 left-0 right-0 bottom-0 bg-white border border-black rounded-xl z-10 overflow-auto'>
            <div className='@apply item-block-cart mb-5'>
                <h3 className='text-2xl font-bold'> Shopping cart</h3>
               <AiOutlineClose onClick={openCart} size={25} style={{cursor:"pointer"}}/>
            </div>
            {cartProducts.map(product =>
                <div key={product.id}  className='mx-5 py-5 border-b border-b-gray-200'>
                    <div className='@apply item-block-cart'>
                        <div className='flex items-center w-[85%]'>
                            <img width={80} height={70} src={product.image} alt={product.title}/>
                            <h4 className='ml-5 text-xl'>{product.title}</h4>
                        </div>
                        <div>
                            <MdDeleteForever onClick={() => dispatch(removeProduct(product.id))} size={30} style={{cursor:"pointer"}}/>
                        </div>
                    </div>
                    <div className='@apply item-block-cart mt-5'>
                        <div className='flex items-center'>
                            <span className='text-xl'>{product.price}</span>
                            <ul className='flex items-center ml-20'>
                                <li onClick={() => dispatch(decrement(product.id))}><AiOutlineMinus style={{cursor:"pointer"}}/></li>
                                <li className='px-5 text-xl'>{product.count}</li>
                                <li onClick={() =>dispatch(increment(product.id))}><AiOutlinePlus style={{cursor:"pointer"}}/></li>
                            </ul>
                        </div>
                        <span className='text-xl font-bold'>{product.price * product.count}$</span>
                    </div>
                </div>
            )}
            <div className='@apply item-block-cart mx-5 py-5'>
                <span onClick={() => dispatch(clearCart())} className='underline cursor-pointer text-lg'>Clear cart</span>
                <div className='flex flex-col'>
                    <span className='text-xl'>Total Price: {totalPrice()}</span>
                    <button className='mt-3 py-2 border rounded-md bg-black text-white'>Buy</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;