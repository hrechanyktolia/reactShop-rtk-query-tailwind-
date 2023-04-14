import React, {FC} from 'react';
import {FaShoppingCart} from "react-icons/fa";

 export type OpenCart = {
    openCart: () => void;
}

const Header: FC<OpenCart> = ({openCart}) => {
    return (
        <div className='h-14 bg-slate-900 flex justify-between items-center'>
            <div className='ml-6'>
                <h2 className='text-white text-2xl font-semibold' >React Shop</h2>
            </div>
            <div>
                <input className='w-64 py-1 px-4 border-0 outline-0 rounded-md'
                       type="text"
                       placeholder='Enter name ...'/>
            </div>
            <div className='mr-6'>
                <FaShoppingCart onClick={openCart}  size={30} style={{color: "white", cursor: "pointer"}}/>
            </div>
            
        </div>
    );
};

export default Header;