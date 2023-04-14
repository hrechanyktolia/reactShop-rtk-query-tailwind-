import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ICartProduct} from "./types";


interface IProductState {
    cart: ICartProduct[];
    selectedCategory: string;
    sortBy: string;

}

const initialState: IProductState = {
    cart: [],
    selectedCategory: '',
    sortBy: 'rating-desc',

}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state:IProductState, action:PayloadAction<ICartProduct>) => {
            const findItem = state.cart.find(item => item.id === action.payload.id)
            if (!findItem) {
                state.cart.push({...action.payload, count: 1})
            }
        },
        removeProduct: (state:IProductState, action:PayloadAction<number>) => {
            state.cart = state.cart.filter(item => item.id !== action.payload)
        },
        clearCart: (state:IProductState) => {
            state.cart = []
        },
        increment: (state:IProductState, action:PayloadAction<number>) => {
            const findItem = state.cart.find(item => item.id === action.payload)
            if (findItem) {
                findItem.count++
            }
        },
        decrement: (state:IProductState, action:PayloadAction<number>) => {
            const findItem = state.cart.find(item => item.id === action.payload)
            if (findItem && findItem.count > 1) {
                findItem.count--
            }
        },
        filterByCategory:(state:IProductState, action:PayloadAction<string>) => {
            state.selectedCategory = action.payload
        },
        filterByRating:(state:IProductState, action:PayloadAction<string>) => {
            state.sortBy = action.payload
        }
    },
})

export const {filterByCategory, filterByRating, addProduct, removeProduct, clearCart, increment, decrement} = productsSlice.actions
export default productsSlice.reducer



