import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ICartProduct} from "./types";


interface IProductState {
    cart: ICartProduct[];
    selectedCategory: string;
    sortRating: string;
    sortPrice: number[];
    search: string;
}

const initialState: IProductState = {
    cart: [],
    selectedCategory: '',
    sortRating: '',
    sortPrice: [0, Infinity],
    search: ''
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
        filterByCategory: (state: IProductState, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload;
        },
        filterByRating: (state:IProductState, action:PayloadAction<string>) => {
          state.sortRating = action.payload
        },
        filterByPrice: (state:IProductState, action:PayloadAction<number[]>) => {
            state.sortPrice = action.payload
        },
        setSearch: (state:IProductState, action:PayloadAction<string>) => {
            state.search = action.payload
        }
    },
})

export const {filterByCategory, filterByRating, filterByPrice, setSearch, addProduct, removeProduct, clearCart, increment, decrement} = productsSlice.actions
export default productsSlice.reducer



