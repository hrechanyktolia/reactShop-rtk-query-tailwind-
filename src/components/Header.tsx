import React, {ChangeEvent, FC} from 'react';
import {FaShoppingCart} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {setSearch} from "../redux/productSlice";

 export type OpenCart = {
    openCart: () => void;
}

const Header: FC<OpenCart> = ({openCart}) => {
    const dispatch = useDispatch()

    const handleInput = (event:ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(event.target.value))
    }

    return (
        <div className='h-14 bg-slate-900 flex justify-between items-center'>
            <div className='ml-6'>
                <h2 className='text-white text-2xl font-semibold' >React Shop</h2>
            </div>
            <div>
                <input className='w-64 py-1 px-4 border-0 outline-0 rounded-md'
                       type="text"
                       onChange={handleInput}
                       placeholder='Enter name ...'/>
            </div>
            <div className='mr-6'>
                <FaShoppingCart onClick={openCart}  size={30} style={{color: "white", cursor: "pointer"}}/>
            </div>

        </div>
    );
};

export default Header;