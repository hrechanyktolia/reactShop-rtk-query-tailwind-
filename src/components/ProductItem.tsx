import React, {FC} from 'react';
import {ICartProduct, IProducts} from "../redux/types";
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../redux/productSlice";
import {RootState} from "../redux/store";
import {BsFillCartCheckFill} from "react-icons/bs";

type Product = {
    product: IProducts
}

const ProductItem: FC<Product> = ({product}) => {

    const cart = useSelector((state: RootState) => state.products.cart)
    const isCart = cart.find(item => item.id === product.id)

    const dispatch = useDispatch()

    const handleAddProduct = (): void => {
        const cartProduct: ICartProduct = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            count: 1
        }
        dispatch(addProduct(cartProduct))
    }
    return (
        <div className='w-[320px] h-[400px] border m-5 p-10 relative flex flex-col'>
            <div className='flex justify-center mb-8'>
                <img className='w-[100px]' src={product.image} alt='product' />
            </div>
            <h4 className='text-center mt-auto'>{product.title}</h4>
            <div className='flex justify-around items-center mt-auto'>
                <span>{product.price}</span>
                {isCart
                    ? <BsFillCartCheckFill size={25}/>
                    : <button className='px-2 py-1 border text-white rounded-md bg-cyan-950'
                              onClick={handleAddProduct}>
                        add to cart
                    </button>
                }
            </div>
        </div>
    );
};

export default ProductItem;